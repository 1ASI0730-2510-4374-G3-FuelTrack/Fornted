<template>
  <div class="payments-table" v-if="product.payments && product.payments.length">
    <table>
      <thead>
      <tr>
        <th>Bank</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Operation #</th>
        <th>Validated</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(payment, index) in product.payments" :key="index">
        <td>{{ payment.bank }}</td>
        <td>{{ formatCurrency(payment.amount) }}</td>
        <td>{{ formatDate(payment.date) }}</td>
        <td>{{ payment.operation }}</td>
        <td>
          <input type="checkbox" v-model="payment.validated" />
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
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

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
  padding: 0.6rem 0.8rem;
  font-size: 0.82rem;
  text-align: left;
  border-bottom: 1px solid #1e324e;
}

thead {
  background-color: #1c2e4a;
}

input[type='checkbox'] {
  transform: scale(1.1);
  cursor: pointer;
  accent-color: #22c55e;
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
