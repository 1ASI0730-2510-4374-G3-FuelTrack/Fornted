<!-- src/pages/client/orders/OrderDetails.vue -->
<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {{ order.orderId }}</p>
      <p><strong>Created:</strong> {{ order.created }}</p>
      <p><strong>User:</strong> {{ order.user }}</p>
      <p><strong>Amount:</strong> {{ order.amount }}</p>
      <p><strong>Terminal:</strong> {{ order.terminal }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>

      <h3>Products</h3>
      <ul>
        <li v-for="(product, index) in order.products" :key="index">
          {{ product.quantity }} {{ product.unit }} of {{ product.product }} at {{ product.price }} (Total: {{ product.total }})
        </li>
      </ul>

      <button @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetails',
  props: {
    order: Object
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  min-width: 400px;
}
</style>
