<template>
  <section class="released-orders">
    <h1 class="title">Released Orders</h1>

    <div v-if="orders.length === 0" class="empty-message">
      No released orders available.
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="header">
          <h2>Order: {{ order.orderId }}</h2>
          <span class="date">{{ formatDate(order.created) }}</span>
        </div>

        <div class="info-grid">
          <div><strong>Client:</strong> {{ order.user }}</div>
          <div><strong>Terminal:</strong> {{ order.terminal }}</div>
          <div><strong>Amount:</strong> {{ order.amount }}</div>
        </div>

        <div class="transport-section" v-if="order.transport">
          <h3>Transport Info</h3>
          <ul>
            <li><strong>Truck:</strong> {{ order.transport.truck.plate }}</li>
            <li><strong>Driver:</strong> {{ order.transport.driver.name }}</li>
            <li><strong>Tank:</strong> {{ order.transport.tank.code }}</li>
          </ul>
        </div>

        <div class="products-section">
          <h3>Products</h3>
          <table>
            <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(p, i) in order.products" :key="i">
              <td>{{ p.product }}</td>
              <td>{{ p.quantity }}</td>
              <td>{{ p.unit }}</td>
              <td>{{ formatCurrency(p.price) }}</td>
              <td>{{ formatCurrency(p.total) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const orders = ref([])

async function fetchReleasedOrders() {
  try {
    const res = await axios.get('http://localhost:3000/orders?status=Released')
    orders.value = res.data
  } catch (error) {
    console.error('❌ Error fetching released orders:', error)
  }
}

function formatDate(dateString) {
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase()
}

function formatCurrency(value) {
  const num = parseFloat(typeof value === 'string' ? value.replace('S/', '').trim() : value)
  if (isNaN(num)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(num).replace('PEN', 'S/')
}

onMounted(fetchReleasedOrders)
</script>

<style scoped>
.released-orders {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}

.title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.empty-message {
  font-size: 1rem;
  color: #94a3b8;
  text-align: center;
  margin-top: 2rem;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.order-card {
  background-color: #13253c;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h2 {
  font-size: 1.2rem;
  font-weight: 600;
}

.date {
  font-size: 0.85rem;
  color: #cbd5e1;
}

.info-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.transport-section,
.products-section {
  margin-top: 1rem;
}

.transport-section ul {
  list-style: none;
  padding-left: 0;
  font-size: 0.9rem;
  line-height: 1.6;
}

.products-section table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
  background-color: #1a314a;
  border-radius: 6px;
  overflow: hidden;
}

.products-section th,
.products-section td {
  padding: 0.6rem;
  font-size: 0.85rem;
  text-align: left;
  border-bottom: 1px solid #2c445f;
}

.products-section th {
  background-color: #1e3955;
  color: #cbd5e1;
}
</style>
