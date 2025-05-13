<template>
  <div class="conciliation-table">
    <table>
      <thead>
      <tr>
        <th>Order ID</th>
        <th>Client</th>
        <th>Date</th>
        <th>Terminal</th>
        <th>Status</th>
        <th>Total</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <template v-for="order in orders" :key="order.id">
        <!-- Fila principal de orden -->
        <tr class="order-row">
          <td>{{ order.orderId }}</td>
          <td>{{ order.user }}</td>
          <td>{{ formatDate(order.created) }}</td>
          <td>{{ order.terminal }}</td>
          <td>
            <span class="badge" :class="order.status.toLowerCase()">{{ order.status }}</span>
          </td>
          <td>{{ formatCurrency(order.amount) }}</td>
          <td>
            <button class="expand-btn" @click="toggleExpanded(order.id)">
              <i :class="['ph', isExpanded(order.id) ? 'ph-caret-up' : 'ph-caret-down']"></i>
            </button>
          </td>
        </tr>

        <!-- Fila expandida con productos -->
        <tr v-if="isExpanded(order.id)">
          <td colspan="7">
            <ConciliationRow :products="order.products" />
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ConciliationRow from './ConciliationRow.vue'

const props = defineProps({
  orders: Array
})

const expandedRows = ref([])

function toggleExpanded(id) {
  if (expandedRows.value.includes(id)) {
    expandedRows.value = expandedRows.value.filter(i => i !== id)
  } else {
    expandedRows.value.push(id)
  }
}

function isExpanded(id) {
  return expandedRows.value.includes(id)
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(value || 0).replace('PEN', 'S/')
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.conciliation-table {
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  background-color: #152238;
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
  font-size: 0.85rem;
  border-bottom: 1px solid #1f2d44;
  text-align: left;
}

.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
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
