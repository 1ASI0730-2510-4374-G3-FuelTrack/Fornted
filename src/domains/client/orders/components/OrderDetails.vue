<template>
  <div class="details-wrapper">
    <table class="details-table">
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Price</th>
        <th>Total Amount</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in products" :key="index">
        <td>{{ product.product }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.unit }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.total }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  products: {
    product: string
    quantity: number
    unit: string
    price: string
    total: string
  }[]
}>()
</script>

<style scoped>
.details-wrapper {
  background-color: #f9fafb;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  margin-top: 8px;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #334155;
}

.details-table thead tr {
  background-color: transparent;
  color: #64748b;
  font-weight: 600;
  font-size: 13px;
}

.details-table th,
.details-table td {
  padding: 0.75rem 1rem;
  text-align: left;
}

.details-table td {
  font-weight: 500;
  color: #475569;
}
</style>
