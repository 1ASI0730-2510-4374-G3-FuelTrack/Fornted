<template>
  <div class="payments-table" v-if="product.payments && product.payments.length">
    <table>
      <thead>
      <tr>
        <th>Bank Account</th>
        <th>Payment Amount</th>
        <th>Date</th>
        <th>Operation Number</th>
        <th class="text-center">Validated</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(payment, index) in product.payments" :key="index">
        <td>{{ payment.bank }}</td>
        <td>{{ formatCurrency(payment.amount) }}</td>
        <td>{{ formatDate(payment.date) }}</td>
        <td>{{ payment.operation }}</td>
        <td class="checkbox-cell">
          <label class="checkbox-wrapper">
            <input
                type="checkbox"
                v-model="payment.validated"
                @change="emitChange"
            />
            <i
                :class="[
                  'ph',
                  payment.validated ? 'ph-check-circle' : 'ph-circle'
                ]"
                :style="{ color: payment.validated ? '#22c55e' : '#f97316' }"
            ></i>
          </label>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div v-else class="no-payments">
    <p>No payments registered for this product.</p>
  </div>
</template>

<script setup>
import { watch } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update'])

watch(
    () => props.product.payments,
    () => {
      emitChange()
    },
    { deep: true, immediate: true }
)

function emitChange() {
  const payments = props.product.payments || []
  const allValid = payments.length > 0 && payments.every(p => p.validated === true)
  emit('update', { validated: allValid })
}

function formatCurrency(value) {
  const val = parseFloat(value)
  if (isNaN(val)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(val).replace('PEN', 'S/')
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.payments-table {
  margin-top: 0.5rem;
  border-radius: 8px;
  background-color: #0d213b;
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

th,
td {
  padding: 0.7rem 1rem;
  font-size: 0.82rem;
  text-align: left;
  border-bottom: 1px solid #1e324e;
}

thead {
  background-color: #1c2e4a;
}

.text-center {
  text-align: center;
}

.checkbox-cell {
  text-align: center;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  position: relative;
}

.checkbox-wrapper input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 0;
}

.no-payments {
  padding: 1rem;
  font-size: 0.85rem;
  color: #94a3b8;
  text-align: center;
  background-color: #1a2a42;
  border-radius: 8px;
}
</style>
