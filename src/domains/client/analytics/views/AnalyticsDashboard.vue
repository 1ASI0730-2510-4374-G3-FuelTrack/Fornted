<template>
  <div class="analytics-dashboard">
    <AnalyticsHeader />

    <section class="operators-section">
      <h2>Operators</h2>
      <OperatorList :orders="orders" />
    </section>

    <section class="chart-section">
      <div class="chart-header">
        <h2>Weekly Activity</h2>
        <select v-model="selectedTerminal">
          <option value="">All Terminals</option>
          <option v-for="t in terminals" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>
      <WeeklyChart :terminal="selectedTerminal" :orders="orders" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AnalyticsHeader from '../components/AnalyticsHeader.vue'
import OperatorList from '../components/OperatorList.vue'
import WeeklyChart from '../components/WeeklyChart.vue'
import { getOrders } from '@/domains/client/orders/services/orderService.js'
import { error as logError } from '@/services/logger'

// Terminales disponibles
const terminals = ['Callao', 'Lurín', 'Pisco', 'Monte Azul']
const selectedTerminal = ref('')

// Órdenes desde la API fake
const orders = ref([])

onMounted(async () => {
  try {
    orders.value = await getOrders()
  } catch (error) {
    logError('❌ Error al cargar órdenes en analytics:', error)
  }
})
</script>

<style scoped>
.analytics-dashboard {
  padding: 2rem;
  background: #f9fafb;
}

.operators-section,
.chart-section {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0.4rem 0.75rem;
  font-size: 0.875rem;
}
</style>
