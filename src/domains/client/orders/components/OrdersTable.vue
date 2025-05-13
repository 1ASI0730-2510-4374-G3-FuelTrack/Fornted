<template>
  <table class="orders-table">
    <thead>
    <tr>
      <th>Creado</th>
      <th>Usuario</th>
      <th>Monto</th>
      <th>Terminal</th>
      <th>ID de Orden</th>
      <th>Estado</th>
    </tr>
    </thead>

    <OrderRow
        v-for="order in orders"
        :key="order.id"
        :order="order"
    />
  </table>
</template>

<script setup lang="ts">
import type { Order } from '@/domains/client/orders/models/Order'
import OrderRow from './OrderRow.vue'

const props = defineProps<{
  orders: Order[]
}>()
</script>

<style scoped>
.orders-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.6rem;
  font-size: 14px;
  background-color: transparent;
}

.orders-table th {
  background-color: #f8fafc;
  font-weight: 600;
  text-align: left;
  padding: 1rem 1.2rem;
  color: #334155;
  font-size: 13.5px;
}

.orders-table td {
  background: white;
  padding: 1rem 1.2rem;
  color: #475569;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  vertical-align: middle;
}

.orders-table tr {
  transition: transform 0.2s ease;
}

.orders-table tr:hover td {
  transform: scale(1.01);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* Estado de badge */
.status {
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  text-transform: capitalize;
}

.status.requested {
  background-color: #d1fae5;
  color: #047857;
}

.status.approved {
  background-color: #fef3c7;
  color: #b45309;
}

.status.released {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.status.closed {
  background-color: #f3e8ff;
  color: #9333ea;
}

</style>
