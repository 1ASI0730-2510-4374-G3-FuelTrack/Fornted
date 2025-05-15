<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-box">
      <div class="modal-header">
        <h2>Cargo</h2>
        <button class="close-btn" @click="close">
          <PhX :size="20" />
        </button>
      </div>

      <div class="section">
        <h3>Transport Information</h3>
        <div class="selector-row">
          <select v-model="selectedTruck">
            <option disabled value="">select truck</option>
            <option v-for="t in filteredTrucks" :key="t.id" :value="t">
              {{ t.plate }} — {{ t.driver }}
            </option>
          </select>

          <select v-model="selectedDriver">
            <option disabled value="">select driver</option>
            <option v-for="d in drivers" :key="d.id" :value="d">{{ d.name }}</option>
          </select>

          <select v-model="selectedTank">
            <option disabled value="">select tank</option>
            <option v-for="t in tanks" :key="t.id" :value="t">{{ t.code }}</option>
          </select>

          <button class="validate-btn" @click="validateTransport">Validate</button>
        </div>

        <p v-if="showValidationMessage" class="validation-msg">
          Please fill all transport fields.
        </p>
      </div>

      <div class="product-table">
        <table>
          <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Total</th>
            <th>Compartment</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(p, i) in products" :key="i">
            <td>{{ p.product }}</td>
            <td>{{ p.quantity }}</td>
            <td>{{ p.unit }}</td>
            <td>{{ formatCurrency(p.price) }}</td>
            <td>{{ formatCurrency(p.total) }}</td>
            <td>
              <select :disabled="!isTransportValid">
                <option disabled value="">select compartment</option>
                <option>Compartment 1</option>
                <option>Compartment 2</option>
                <option>Compartment 3</option>
              </select>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-footer">
        <button class="save-btn" :disabled="!isTransportValid" @click="saveAssignment">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PhX } from '@phosphor-icons/vue'
import { assignTransportToOrder } from '../services/dispatchService'

const props = defineProps({
  product: Object,
  trucks: Array,
  drivers: Array,
  tanks: Array,
  orderId: Number
})
console.log('🧪 Modal abierto con orderId:', props.orderId)

const emit = defineEmits(['close'])

const selectedTruck = ref(null)
const selectedDriver = ref(null)
const selectedTank = ref(null)
const isTransportValid = ref(false)
const showValidationMessage = ref(false)
const products = ref([props.product])

const filteredTrucks = computed(() =>
    props.trucks.filter(truck => truck.fuel === props.product.product)
)

function validateTransport() {
  if (selectedTruck.value && selectedDriver.value && selectedTank.value) {
    isTransportValid.value = true
    showValidationMessage.value = false
  } else {
    isTransportValid.value = false
    showValidationMessage.value = true
  }
}

function close() {
  emit('close')
}

async function saveAssignment() {
  if (!isTransportValid.value) return
  const payload = {
    truck: selectedTruck.value,
    driver: selectedDriver.value,
    tank: selectedTank.value
  }
  console.log('>>> Modal saveAssignment payload:', props.orderId, payload)

  try {
    const result = await assignTransportToOrder(props.orderId, payload)
    console.log('<<< Modal saveAssignment result:', result)
    // Toast de éxito
    window.alert('✅ Order released successfully!')
    emit('close')
  } catch (error) {
    // Mostrar mensaje detallado
    const msg = error.response?.data || error.message
    console.error('❌ Error saving transport assignment detail:', msg)
    window.alert(`❌ Error saving transport assignment: ${msg}`)
  }
}

function formatCurrency(value) {
  const num = parseFloat(typeof value === 'string' ? value.replace('S/', '').trim() : value)
  if (isNaN(num)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(num).replace('PEN', 'S/')
}
</script>
<style scoped>
/* Fondo oscuro y desenfocado */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(12, 31, 58, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.25s ease-out;
}

/* Caja del modal con sombra, borde suave y transición */
.modal-box {
  background-color: #1e2e4a;
  border-radius: 16px;
  padding: 2rem;
  width: 92%;
  max-width: 860px;
  color: #ffffff;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35);
  animation: scaleIn 0.25s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header del modal */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #334155;
  padding-bottom: 0.5rem;
}

.modal-header h2 {
  font-size: 1.2rem;
  font-weight: 600;
}

/* Botón de cerrar */
.close-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s ease;
}
.close-btn:hover {
  color: #ef4444;
}

/* Sección de transporte */
.section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.selector-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.selector-row select {
  background-color: #1a314a;
  color: white;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  min-width: 150px;
  flex: 1;
}

.validate-btn {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.validate-btn:hover {
  background-color: #16a34a;
}

.validation-msg {
  color: #f87171;
  background: #7f1d1d33;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

/* Tabla de productos */
.product-table table {
  width: 100%;
  border-collapse: collapse;
  background-color: #1a314a;
  border-radius: 8px;
  overflow: hidden;
}

.product-table th,
.product-table td {
  padding: 0.75rem;
  font-size: 0.85rem;
  text-align: left;
  border-bottom: 1px solid #2c445f;
}

.product-table th {
  background-color: #1e3955;
  color: #cbd5e1;
}

.product-table td {
  color: #f1f5f9;
}

.product-table select {
  background-color: #334155;
  color: white;
  border: none;
  padding: 0.4rem;
  border-radius: 6px;
}

/* Footer del modal */
.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  background-color: #22c55e;
  border: none;
  padding: 0.65rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.save-btn:hover {
  background-color: #16a34a;
}
.save-btn:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0 }
  to { transform: scale(1); opacity: 1 }
}
</style>
