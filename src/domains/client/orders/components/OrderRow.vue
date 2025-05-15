<template>
  <tbody>
  <tr @click="toggle" class="order-row">
    <td>
        <span class="arrow" :class="{ rotated: expanded }">
          <i class="ph ph-caret-right"></i>
        </span>
      {{ formatDate(order.created) }}
    </td>
    <td>{{ order.user }}</td>
    <td>{{ order.amount }}</td>
    <td>{{ order.terminal }}</td>
    <td class="order-id">
      <span>{{ order.orderId }}</span>
      <i class="ph ph-copy" @click.stop="copyToClipboard(order.orderId)" title="Copiar ID"></i>
    </td>
    <td>
        <span :class="['status', order.status.toLowerCase()]">
          {{ order.status }}
        </span>
    </td>
  </tr>

  <tr v-if="expanded">
    <td colspan="6">
      <OrderDetails :products="order.products" />
    </td>
  </tr>
  </tbody>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Order } from '@/domains/client/orders/models/Order'
import OrderDetails from './OrderDetails.vue'

const props = defineProps<{
  order: Order
}>()

const expanded = ref(false)
const toggle = () => (expanded.value = !expanded.value)

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).toUpperCase()
}
</script>

<style scoped>
.order-row {
  cursor: pointer;
  transition: background 0.2s ease;
}

.order-row:hover {
  background-color: #f1f5f9;
}

.arrow {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  transition: transform 0.3s ease;
  color: #64748b;
}

.rotated {
  transform: rotate(90deg);
}

.order-id {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status {
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
  text-transform: capitalize;
}

.status.requested {
  background-color: #E2FFE8; /* Verde claro */
  color: #2DA345;
}

.status.approved {
  background-color: #FFF2E5; /* Amarillo claro */
  color: #FC984D;
}

.status.released {
  background-color: #D4EDFF; /* Azul claro */
  color: #3088CB;
}

.status.closed {
  background-color: #F9D4FF; /* Morado claro */
  color: #A33ECF;
}

</style>
