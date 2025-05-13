<template>
  <div class="orders-table">
    <table>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Client</th>
        <th>Created</th>
        <th>Terminal</th>
        <th>Status</th>
        <th>Total</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="order in orders" :key="order.id">
        <!-- Fila principal -->
        <tr class="table-row">
          <td>{{ order.orderId }}</td>
          <td>{{ order.user }}</td>
          <td>{{ formatDate(order.created) }}</td>
          <td>{{ order.terminal }}</td>
          <td>
              <span :class="['badge', order.status.toLowerCase()]">
                {{ order.status }}
              </span>
          </td>
          <td>{{ formatCurrency(order.amount) }}</td>
          <td>
            <button class="expand-btn" @click="toggleExpanded(order.id)">
              <i :class="['ph', expandedRows.includes(order.id) ? 'ph-caret-up' : 'ph-caret-down']"></i>
            </button>
          </td>
        </tr>

        <!-- Fila expandida -->
        <tr v-if="expandedRows.includes(order.id)" class="expanded-row">
          <td colspan="7">
            <table class="products-table">
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
              <tr v-for="(product, index) in order.products" :key="index">
                <td>{{ product.product }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.unit }}</td>
                <td>{{ formatCurrency(product.price) }}</td>
                <td>{{ product.total }}</td>
              </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

const expandedRows = ref([])

function toggleExpanded(orderId) {
  const index = expandedRows.value.indexOf(orderId)
  if (index > -1) {
    expandedRows.value.splice(index, 1)
  } else {
    expandedRows.value.push(orderId)
  }
}

function formatCurrency(amount) {
  if (isNaN(amount)) return '—'
  const formatted = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(amount)
  return formatted.replace('PEN', 'S/')
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.orders-table {
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  background-color: #152238;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

thead {
  background-color: #1e2e4a;
}

th,
td {
  padding: 1rem;
  text-align: left;
  font-size: 0.85rem;
  border-bottom: 1px solid #1f2d44;
  white-space: nowrap;
}

th {
  font-weight: 600;
  color: #cbd5e1;
}

.table-row:hover {
  background-color: #20304a;
  transition: background-color 0.2s ease-in-out;
}

.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.badge.requested {
  background-color: #00ffff22;
  color: #00ffff;
}

.badge.approved {
  background-color: #50fa7b22;
  color: #50fa7b;
}

.badge.released {
  background-color: #ffdd5722;
  color: #ffdd57;
}

.badge.dispatched {
  background-color: #1f9bff22;
  color: #1f9bff;
}

.badge.closed {
  background-color: #64748b33;
  color: #94a3b8;
}

.expand-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #1e2e4a;
  border-radius: 8px;
  overflow: hidden;
}

.products-table th,
.products-table td {
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  border-bottom: 1px solid #2c3e60;
}

.products-table th {
  font-weight: 600;
  color: #93b1cc;
}
</style>
