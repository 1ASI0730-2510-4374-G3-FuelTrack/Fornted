<template>
  <header class="conciliations-header">
    <!-- Fila superior -->
    <div class="top-row">
      <div class="left-block">
        <div class="title-block">
          <h1 class="title">Conciliations</h1>
          <p class="subtitle">Check your order's payments and approve them!</p>
        </div>
      </div>

      <div class="breadcrumb">
        <span>Home</span> / <strong>Conciliations</strong>
      </div>
    </div>

    <!-- Fila media -->
    <div class="middle-row">
      <div class="buttons">
        <button class="load-btn" @click="openModal">
          <i class="ph ph-upload-simple"></i>
          Load Bank Statement
        </button>

        <button class="clear-btn">
          <i class="ph ph-trash"></i>
          Clear Document
        </button>
      </div>

      <div class="kpi-container">
        <div class="kpi">
          <span class="value">{{ formatNumber(totalOrders) }}</span>
          <span class="label">Total Orders</span>
        </div>
        <div class="divider"></div>
        <div class="kpi">
          <span class="value approved">{{ formatNumber(totalApproved) }}</span>
          <span class="label">Approved</span>
        </div>
        <div class="divider"></div>
        <div class="kpi">
          <span class="value requested">{{ formatNumber(totalRequested) }}</span>
          <span class="label">Requested</span>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bottom-row">
      <div class="filters">
        <button class="filter-btn">
          <i class="ph ph-sliders-horizontal"></i>
          Filters
        </button>
        <button class="filter-btn">
          <i class="ph ph-calendar-blank"></i>
          Date Range
        </button>
      </div>
    </div>

    <LoadDocumentModal
        v-if="showModal"
        @close="closeModal"
        @submit="handleSubmit"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue'
import LoadDocumentModal from './LoadDocumentModal.vue'
import { log } from '@/services/logger'

const props = defineProps({
  totalOrders: Number,
  totalApproved: Number,
  totalRequested: Number
})

const emit = defineEmits(['load-documents'])

const showModal = ref(false)

function openModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function handleSubmit(files) {
  log('Archivos cargados:', files)
  closeModal()
}

function formatNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + 'M'
  if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K'
  return value
}
</script>

<style scoped>
.conciliations-header {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  font-family: 'Segoe UI', sans-serif;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 0.5rem;
}

.title-block .title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.title-block .subtitle {
  font-size: 0.95rem;
  color: #cbd5e1;
  margin-top: 0.3rem;
}

.breadcrumb {
  font-size: 0.8rem;
  color: #94a3b8;
}

.middle-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.load-btn,
.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.load-btn {
  background-color: #f97316;
  color: #ffffff;
}

.clear-btn {
  background-color: #ef4444;
  color: #ffffff;
}

.load-btn:hover,
.clear-btn:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

.kpi-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.value {
  font-size: 1.4rem;
  font-weight: bold;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
}

.value.approved {
  color: #22c55e;
}

.value.requested {
  color: #00ffff;
}

.label {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.2rem;
}

.divider {
  width: 1px;
  height: 2.2rem;
  background-color: #334155;
  opacity: 0.6;
}

.bottom-row {
  display: flex;
  justify-content: flex-end;
}

.filters {
  display: flex;
  gap: 0.8rem;
}

.filter-btn {
  background-color: #1e2e4a;
  color: #cbd5e1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filter-btn:hover {
  background-color: #324260;
}
</style>
