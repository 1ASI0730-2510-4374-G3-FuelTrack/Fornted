<template>
  <div class="pagination-container">
    <div class="left">
      <label>
        Items per page:
        <select v-model.number="limit" @change="changeLimit">
          <option v-for="n in [5, 10, 13, 25]" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>
    </div>

    <div class="center">
      {{ startItem }} – {{ endItem }} of {{ totalItems }} items
    </div>

    <div class="right">
      <button :disabled="currentPage === 1" @click="emit('change', 1)">«</button>
      <button :disabled="currentPage === 1" @click="emit('change', currentPage - 1)">‹</button>
      <span class="page">{{ currentPage }}</span>
      <button :disabled="currentPage === totalPages" @click="emit('change', currentPage + 1)">›</button>
      <button :disabled="currentPage === totalPages" @click="emit('change', totalPages)">»</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { getOrders } from '@/domains/client/orders/services/orderService.js'

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  totalItems: Number,
  itemsPerPage: Number
})

const emit = defineEmits(['change', 'limitChange'])

const limit = ref(props.itemsPerPage)

const startItem = computed(() => {
  return (props.currentPage - 1) * limit.value + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * limit.value, props.totalItems)
})

function changeLimit() {
  emit('limitChange', limit.value)
}
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 13.5px;
  color: #475569;
  background-color: #f9fafb;
  border-top: 1px solid #e2e8f0;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.left label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

select {
  padding: 0.35rem 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 13px;
}

.right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 6px;
  background-color: #0ea5e9;
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: #0284c7;
}

button:disabled {
  background-color: #cbd5e1;
  color: white;
  cursor: not-allowed;
}

.page {
  font-weight: 600;
  color: #1e293b;
}
</style>
