<template>
  <div class="terminals-summary">
    <div
        v-if="enrichedTerminals.length"
        v-for="terminal in enrichedTerminals"
        :key="terminal.name"
        class="terminal-card"
    >
      <h3>
        <i class="ph ph-factory"></i> {{ terminal.name }}
      </h3>
      <div class="stats">
        <div class="stat-box">
          <span class="label">Órdenes</span>
          <span class="value">{{ terminal.totalOrders }}</span>
        </div>
        <div class="stat-box">
          <span class="label">Galones</span>
          <span class="value">{{ formatGallons(terminal.totalGallons) }}</span>
        </div>
        <div class="stat-box">
          <span class="label">Estado común</span>
          <span class="badge" :class="statusClass(terminal.topStatus)">
            {{ terminal.topStatus }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="no-data">
      <i class="ph ph-warning"></i>
      No hay terminales registrados.
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { getTerminals, getOrders } from '../services/terminalService.js'

const terminals = ref([])
const orders = ref([])

onMounted(async () => {
  terminals.value = await getTerminals()
  orders.value = await getOrders()
})

const enrichedTerminals = computed(() =>
    terminals.value.map(t => {
      const related = orders.value.filter(o => o.terminal === t.name)
      const gallons = related.reduce((sum, o) => sum + o.products.reduce((g, p) => g + p.quantity, 0), 0)
      const statusCount = {}
      related.forEach(o => (statusCount[o.status] = (statusCount[o.status] || 0) + 1))
      const topStatus = Object.entries(statusCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
      return {
        name: t.name,
        totalOrders: related.length,
        totalGallons: gallons,
        topStatus
      }
    })
)

function statusClass(status) {
  return {
    Requested: 'badge-requested',
    Approved: 'badge-approved',
    Released: 'badge-released',
    Closed: 'badge-closed'
  }[status] || 'badge-default'
}

function formatGallons(value) {
  return new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 }).format(value) + ' gal'
}
</script>

<style scoped>
.terminals-summary {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.terminal-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.terminal-card h3 {
  font-size: 1.05rem;
  margin-bottom: 1rem;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.stat-box {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
}

.label {
  color: #64748b;
}

.value {
  font-weight: 600;
  color: #0f172a;
}

.badge {
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
  white-space: nowrap;
}

.badge-requested {
  background-color: #d1fae5;
  color: #047857;
}

.badge-approved {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-released {
  background-color: #dbeafe;
  color: #1d4ed8;
}

.badge-closed {
  background-color: #e5e7eb;
  color: #374151;
}

.badge-default {
  background-color: #f3f4f6;
  color: #6b7280;
}

.no-data {
  grid-column: 1 / -1;
  padding: 2rem;
  text-align: center;
  color: #64748b;
  font-size: 0.95rem;
  background: #fef2f2;
  border: 1px dashed #fca5a5;
  border-radius: 12px;
}
</style>
