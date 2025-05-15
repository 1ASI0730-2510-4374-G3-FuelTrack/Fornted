<template>
  <div class="pagination-bar">
    <!-- Items per page -->
    <div class="items-per-page">
      <span>Items per page:</span>
      <select v-model="selectedPerPage" @change="changeItemsPerPage">
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Range info -->
    <div class="range-info">
      {{ startItem }} - {{ endItem }} of {{ total }} items
    </div>

    <!-- Navigation -->
    <div class="page-navigation">
      <select v-model="formattedPage" @change="emitPageChange(formattedPage)">
        <option v-for="i in totalPages" :key="i" :value="formatPage(i)">
          {{ formatPage(i) }}
        </option>
      </select>
      <span>of {{ formatPage(totalPages) }} pages</span>

      <button :disabled="page <= 1" @click="changePage(page - 1)">
        <i class="ph ph-caret-left"></i>
      </button>
      <button :disabled="page >= totalPages" @click="changePage(page + 1)">
        <i class="ph ph-caret-right"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  page: Number,
  total: Number,
  itemsPerPage: Number
})
const emit = defineEmits(['changePage', 'update:itemsPerPage'])

const perPageOptions = [5, 10, 13, 15, 25]
const selectedPerPage = ref(props.itemsPerPage)
const formattedPage = ref(formatPage(props.page))

const totalPages = computed(() => Math.max(Math.ceil(props.total / props.itemsPerPage), 1))
const startItem = computed(() => (props.total === 0 ? 0 : (props.page - 1) * props.itemsPerPage + 1))
const endItem = computed(() => Math.min(props.page * props.itemsPerPage, props.total))

watch(() => props.itemsPerPage, val => selectedPerPage.value = val)
watch(() => props.page, val => formattedPage.value = formatPage(val))

function formatPage(page) {
  return String(page).padStart(2, '0')
}

function parsePage(str) {
  return parseInt(str, 10)
}

function emitPageChange(formattedStr) {
  emit('changePage', parsePage(formattedStr))
}

function changePage(newPage) {
  emit('changePage', newPage)
}

function changeItemsPerPage() {
  emit('update:itemsPerPage', Number(selectedPerPage.value))
}
</script>

<style scoped>
.pagination-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e2e4a;
  padding: 1rem;
  border-radius: 10px;
  color: #cbd5e1;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.85rem;
}

.items-per-page select,
.page-navigation select {
  background-color: #0c1f3a;
  color: white;
  border: 1px solid #2c3e60;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 0.85rem;
}

.items-per-page,
.range-info,
.page-navigation {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  background-color: #243955;
  border: none;
  border-radius: 8px;
  padding: 0.4rem 0.7rem;
  color: #cbd5e1;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover:enabled {
  background-color: #2c3e60;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
