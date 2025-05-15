<template>
  <header class="orders-header">
    <div class="top-row">
      <div class="left-title">
        <h1 class="title">Order Management</h1>
        <p class="subtitle">Manage your customers' orders</p>
      </div>

      <div class="right-breadcrumb">
        <span class="breadcrumb">Home</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">Order Management</span>
      </div>
    </div>

    <div class="kpi-row">
      <div class="kpi-block">
        <span class="kpi-value">{{ formatNumber(totalOrders) }}</span>
        <span class="kpi-label">Total Orders</span>
      </div>

      <div class="kpi-divider"></div>

      <div class="kpi-block">
        <span class="kpi-value">{{ formatNumber(totalApproved) }}</span>
        <span class="kpi-label">Approved</span>
      </div>

      <div class="kpi-divider"></div>

      <div class="kpi-block">
        <span class="kpi-value">{{ formatNumber(totalRequested) }}</span>
        <span class="kpi-label">Requested</span>
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
.orders-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

/* Primera fila: título a la izquierda, breadcrumb a la derecha */
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.left-title {
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

.right-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.breadcrumb-current {
  font-weight: 600;
  color: #ffffff;
}

/* Segunda fila: KPIs alineados horizontalmente con divisores */
.kpi-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.kpi-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
}

.kpi-value {
  font-size: 1.6rem;
  font-weight: 700;
  color: #22c55e;
}

.kpi-label {
  font-size: 0.85rem;
  color: #cbd5e1;
  margin-top: 0.2rem;
}

.kpi-divider {
  width: 1px;
  height: 2.5rem;
  background-color: #3b4e68;
  opacity: 0.5;
}
</style>
