<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <div class="modal-content animate">
        <!-- Header fijo -->
        <header class="modal-header">
          <h2>📝 Crear nueva orden</h2>
          <button @click="emit('close')" class="close-btn">✕</button>
        </header>

        <!-- Paso visual -->
        <ProgressStepper :current-step="step" />

        <!-- Cuerpo con scroll -->
        <div class="modal-body">
          <component
              :is="currentComponent"
              v-model:modelValue="formData"
              @invalid="validationFailed = true"
          />
        </div>

        <!-- Footer fijo -->
        <footer class="modal-footer">
          <button v-if="step > 1" @click="prevStep" class="btn secondary">Atrás</button>
          <button v-if="step < 3" @click="nextStep" class="btn primary">Siguiente</button>
          <button v-else @click="confirmOrder" class="btn success">Confirmar</button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProgressStepper from './ProgressStepper.vue'
import StepOrderDetails from './StepOrderDetails.vue'
import StepPayments from './StepPayments.vue'
import StepConfirmOrder from './StepConfirmOrder.vue'
import { useOrdersStore } from '../../store/useOrdersStore'
const ordersStore = useOrdersStore()

const emit = defineEmits(['close'])

const step = ref(1)
const validationFailed = ref(false)

const formData = ref({
  fullName: '',
  terminal: '',
  details: [
    {
      product: '',
      quantity: 0,
      note: '',
      totalPrice: '0.00'
    }
  ],
  payments: [] // Este campo guarda los pagos por cada producto (array por índice)
})

const currentComponent = computed(() => {
  if (step.value === 1) return StepOrderDetails
  if (step.value === 2) return StepPayments
  return StepConfirmOrder
})

function nextStep() {
  validationFailed.value = false
  if (step.value === 1) {
    setTimeout(() => {
      if (!validationFailed.value) step.value++
    }, 0)
  } else {
    step.value++
  }
}

function prevStep() {
  if (step.value > 1) step.value--
}

async function confirmOrder() {
  try {
    const enrichedProducts = formData.value.details.map((detail, index) => {
      const quantity = Number(detail.quantity)
      const unitPrice = quantity > 0
          ? (parseFloat(detail.totalPrice.replace('S/', '').trim()) / quantity).toFixed(2)
          : '0.00'

      return {
        product: detail.product,
        quantity,
        unit: 'gal',
        price: unitPrice,
        total: detail.totalPrice,
        payments: (formData.value.payments[index] || []).map(p => ({
          bank: p.account,
          amount: p.amount,
          date: p.date,
          operation: p.operationNumber,
          validated: false
        }))
      }
    })

    await ordersStore.addOrder({
      id: Date.now(),
      created: new Date().toISOString().split('T')[0],
      user: formData.value.fullName,
      terminal: formData.value.terminal,
      amount: calcularTotal(formData.value.details),
      orderId: generarOrderId(),
      status: 'Requested',
      products: enrichedProducts
    })

    emit('close')
  } catch (err) {
    console.error('❌ Detalle del error en confirmOrder:', err.message, err.response?.data)
  }

}

function generarOrderId() {
  return 'd_' + Math.random().toString(36).substring(2, 12)
}

function calcularTotal(details) {
  const total = details.reduce((acc, d) => {
    const raw = typeof d.totalPrice === 'string'
        ? parseFloat(d.totalPrice.replace('S/', '').trim())
        : parseFloat(d.totalPrice)
    return acc + (isNaN(raw) ? 0 : raw)
  }, 0)
  return `S/ ${total.toFixed(2)}`
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background-color: white;
  width: 90%;
  max-width: 860px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1 1 auto;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-shrink: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #64748b;
  cursor: pointer;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
  border: none;
}
.btn.primary {
  background-color: #0ea5e9;
  color: white;
}
.btn.primary:hover {
  background-color: #0284c7;
}
.btn.secondary {
  background-color: #f1f5f9;
  color: #334155;
}
.btn.success {
  background-color: #10b981;
  color: white;
}
.btn.success:hover {
  background-color: #059669;
}

.animate {
  animation: fadeInUp 0.3s ease-out;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
