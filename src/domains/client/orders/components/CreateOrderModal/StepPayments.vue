<template>
  <div class="step-payments">
    <h2 class="section-title">
      <i class="ph ph-credit-card text-green-600"></i>
      Pagos por Detalle
    </h2>

    <div
        v-for="(detail, detailIndex) in orderDetails"
        :key="detailIndex"
        class="order-section"
    >
      <!-- Encabezado de detalle -->
      <div class="order-header">
        <div class="info-block">
          <span class="label"><i class="ph ph-gas-pump"></i> Producto</span>
          <span class="value">{{ detail.product || '—' }}</span>
        </div>
        <div class="info-block">
          <span class="label"><i class="ph ph-drop"></i> Cantidad</span>
          <span class="value">{{ detail.quantity }} gal</span>
        </div>
        <div class="info-block">
          <span class="label"><i class="ph ph-coins"></i> Total</span>
          <span class="value">
            {{
              parseFloat(detail.totalPrice?.replace('S/', '') || '0').toFixed(2)
            }}
          </span>
        </div>
      </div>

      <!-- Pagos -->
      <div
          v-for="(payment, paymentIndex) in payments[detailIndex] || []"
          :key="paymentIndex"
          class="payment-form"
      >
        <div class="field">
          <label><i class="ph ph-bank"></i> Cuenta Bancaria</label>
          <select
              :value="payment.account"
              @input="e => updatePayment(detailIndex, paymentIndex, 'account', e.target.value)"
          >
            <option value="">Seleccione banco</option>
            <option value="BCP">BCP</option>
            <option value="BBVA">BBVA</option>
            <option value="Interbank">Interbank</option>
          </select>
        </div>

        <div class="field">
          <label><i class="ph ph-currency-circle-dollar"></i> Monto</label>
          <input
              type="number"
              min="0"
              :value="payment.amount"
              @input="e => updatePayment(detailIndex, paymentIndex, 'amount', Number(e.target.value))"
              placeholder="Ingrese el monto"
          />
        </div>

        <div class="field">
          <label><i class="ph ph-calendar-blank"></i> Fecha y hora</label>
          <input
              type="datetime-local"
              :value="payment.date"
              @input="e => updatePayment(detailIndex, paymentIndex, 'date', e.target.value)"
          />
        </div>

        <div class="field with-remove">
          <label><i class="ph ph-barcode"></i> N° Operación</label>
          <div class="input-with-icon">
            <input
                type="text"
                :value="payment.operationNumber"
                @input="e => updatePayment(detailIndex, paymentIndex, 'operationNumber', e.target.value)"
                placeholder="Ingrese número"
            />
            <button
                v-if="(payments[detailIndex] || []).length > 1"
                @click="removePayment(detailIndex, paymentIndex)"
                class="remove-btn"
                title="Eliminar pago"
            >
              <i class="ph ph-trash-simple"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <button class="add-btn" @click="addPayment(detailIndex)">
        <i class="ph ph-plus-circle"></i> Agregar Pago
      </button>

      <div class="total-amount">
        <i class="ph ph-wallet text-green-700"></i>
        <strong>Total pagado:</strong>
        S/
        {{
          (payments[detailIndex] || [])
              .reduce((acc, p) => acc + Number(p.amount || 0), 0)
              .toFixed(2)
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const orderDetails = computed(() => props.modelValue.details || [])
const payments = computed(() => props.modelValue.payments || [])

function addPayment(detailIndex) {
  const updated = [...payments.value]
  if (!updated[detailIndex]) updated[detailIndex] = []

  updated[detailIndex].push({
    account: '',
    amount: 0,
    date: '',
    operationNumber: ''
  })

  emit('update:modelValue', {
    ...props.modelValue,
    payments: updated
  })
}

function removePayment(detailIndex, paymentIndex) {
  const updated = [...payments.value]
  if (updated[detailIndex]) {
    updated[detailIndex].splice(paymentIndex, 1)
  }

  emit('update:modelValue', {
    ...props.modelValue,
    payments: updated
  })
}

function updatePayment(detailIndex, paymentIndex, field, value) {
  const updated = [...payments.value]
  updated[detailIndex] = [...(updated[detailIndex] || [])]
  updated[detailIndex][paymentIndex] = {
    ...updated[detailIndex][paymentIndex],
    [field]: value
  }

  emit('update:modelValue', {
    ...props.modelValue,
    payments: updated
  })
}
</script>

<style scoped>
.step-payments {
  padding: 2rem 1.5rem;
  background-color: #f8fafc;
}

.section-title {
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.order-section {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.order-header {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #e2e8f0;
  margin-bottom: 1.2rem;
}

.info-block {
  flex: 1 1 220px;
}

.label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.value {
  font-size: 1.05rem;
  font-weight: 600;
  color: #1e293b;
  margin-top: 0.2rem;
}

.payment-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem 0;
  position: relative;
  border-bottom: 1px dashed #e2e8f0;
}

.field label {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.field input,
.field select {
  width: 100%;
  padding: 0.45rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
  background-color: #f9fafb;
  transition: border-color 0.2s;
}

.field input:focus,
.field select:focus {
  border-color: #0ea5e9;
  outline: none;
}

.remove-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  font-size: 1.1rem;
  margin-left: auto;
  cursor: pointer;
  transition: color 0.2s ease;
}

.remove-btn:hover {
  color: #dc2626;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #22c55e;
  color: white;
  padding: 0.5rem 1.1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-btn:hover {
  background-color: #16a34a;
}

.total-amount {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #bbf7d0;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
}
</style>
