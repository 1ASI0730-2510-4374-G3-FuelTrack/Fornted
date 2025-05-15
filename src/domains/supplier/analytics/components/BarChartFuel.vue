<template>
  <div class="chart-container">
    <h2 class="chart-title">Fuel Volume by Type</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

// Agrupar volumen por tipo de combustible
const volumesByFuel = computed(() => {
  const map = {}

  props.orders.forEach(order => {
    order.products.forEach(p => {
      const type = p.product
      const qty = parseFloat(p.quantity) || 0
      map[type] = (map[type] || 0) + qty
    })
  })

  return map
})

// Preparar datos para Chart.js
const chartData = computed(() => ({
  labels: Object.keys(volumesByFuel.value),
  datasets: [
    {
      label: 'Gallons',
      data: Object.values(volumesByFuel.value),
      backgroundColor: '#22c55e'
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e2e4a',
      titleColor: '#22c55e',
      bodyColor: '#ffffff'
    }
  },
  scales: {
    x: {
      ticks: { color: '#cbd5e1' },
      grid: { color: '#1e293b' }
    },
    y: {
      ticks: { color: '#cbd5e1' },
      grid: { color: '#1e293b' }
    }
  }
}
</script>

<style scoped>
.chart-container {
  flex: 1;
  background-color: #1e2e4a;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  min-width: 300px;
}

.chart-title {
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 1rem;
}
</style>
