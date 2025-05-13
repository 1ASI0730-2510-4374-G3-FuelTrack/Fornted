<template>
  <div class="product-table">
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
      <template v-for="(product, index) in products" :key="index">
        <tr>
          <td>{{ product.product }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.unit }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ product.total }}</td>
          <td>
            <button class="expand-btn" @click="toggleProduct(index)">
              <i :class="['ph', expanded.includes(index) ? 'ph-caret-up' : 'ph-caret-down']"></i>
            </button>
          </td>
        </tr>

        <!-- Pagos asociados al producto -->
        <tr v-if="expanded.includes(index)">
          <td colspan="6">
            <PaymentDetails :product="product" />
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PaymentDetails from './PaymentDetails.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

const expanded = ref([])

function toggleProduct(index) {
  if (expanded.value.includes(index)) {
    expanded.value = expanded.value.filter(i => i !== index)
  } else {
    expanded.value.push(index)
  }
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
.product-table {
  width: 100%;
  background-color: #1a2b46;
  border-radius: 10px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

th,
td {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.82rem;
  border-bottom: 1px solid #283957;
}

thead {
  background-color: #22324c;
}

.expand-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.expand-btn:hover {
  transform: rotate(180deg);
}
</style>
