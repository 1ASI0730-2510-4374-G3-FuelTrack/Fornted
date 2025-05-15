<template>
  <div class="product-row">
    <table>
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Price</th>
        <th>Total</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ product.product }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.unit }}</td>
        <td>{{ formatCurrency(product.price) }}</td>
        <td>{{ product.total }}</td>
        <td>
          <button class="expand-btn" @click="expanded = !expanded">
            <i :class="['ph', expanded ? 'ph-caret-up' : 'ph-caret-down']"></i>
          </button>
        </td>
      </tr>

      <tr v-if="expanded">
        <td colspan="6">
          <PaymentDetails
              :product="product"
              @update="onPaymentsUpdate"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import PaymentDetails from './PaymentDetails.vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['validated'])

const expanded = ref(false)

// Verificar pagos al montar o actualizar producto
watch(() => props.product, () => {
  checkAllValidated()
}, { immediate: true })

function onPaymentsUpdate() {
  checkAllValidated()
}

function checkAllValidated() {
  const payments = props.product.payments || []
  const isValid = payments.length > 0 && payments.every(p => p.validated)
  emit('validated', { product: props.product.product, validated: isValid })
}

function formatCurrency(value) {
  const val = parseFloat(value)
  if (isNaN(val)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(val).replace('PEN', 'S/')
}
</script>


<style scoped>
.product-row {
  margin-top: 0.5rem;
  border-radius: 10px;
  background-color: #1b2d47;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

thead {
  background-color: #22324c;
}

th,
td {
  padding: 0.7rem;
  font-size: 0.82rem;
  border-bottom: 1px solid #32445f;
  text-align: left;
}

.expand-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
}
</style>
