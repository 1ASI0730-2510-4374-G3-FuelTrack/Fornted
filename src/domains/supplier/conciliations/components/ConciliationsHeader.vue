<template>
  <header class="conciliations-header">
    <!-- Fila superior: título + breadcrumb -->
    <div class="top-row">
      <div class="title-block">
        <h1 class="title">Conciliations</h1>
        <p class="subtitle">Manage and verify payment statements</p>
      </div>

      <div class="breadcrumb">
        <span>Home</span>
        <span class="separator">/</span>
        <span class="current">Conciliations</span>
      </div>
    </div>

    <!-- Fila inferior: KPIs + botones -->
    <div class="bottom-row">
      <div class="kpi-bar">
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

      <div class="action-buttons">
        <button class="load-btn">
          <i class="ph ph-upload-simple"></i> Load Bank Statement
        </button>
        <button class="clear-btn">
          <i class="ph ph-trash"></i> Clear Document
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  totalOrders: Number,
  totalApproved: Number,
  totalRequested: Number
})

function formatNumber(value) {
  if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M'
  if (value >= 1000) return (value / 1000).toFixed(2) + 'K'
  return value
}
</script>

<style scoped>
.conciliations-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.title-block {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #ffffff;
}

.subtitle {
  font-size: 0.95rem;
  color: #b0c4de;
  margin-top: 0.25rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.current {
  font-weight: 600;
  color: #ffffff;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.kpi-bar {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

.kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-size: 1.6rem;
  font-weight: bold;
  color: #ffffff;
}

.value.approved {
  color: #50fa7b;
}

.value.requested {
  color: #00ffff;
}

.label {
  font-size: 0.85rem;
  color: #cbd5e1;
  margin-top: 0.2rem;
}

.divider {
  width: 1px;
  height: 2.2rem;
  background-color: #3b4e68;
  opacity: 0.5;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.load-btn,
.clear-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.load-btn {
  background-color: #f97316;
  color: #ffffff;
}

.clear-btn {
  background-color: #1e2e4a;
  color: #cbd5e1;
}

.load-btn:hover {
  background-color: #ea580c;
}

.clear-btn:hover {
  background-color: #324260;
}
</style>
