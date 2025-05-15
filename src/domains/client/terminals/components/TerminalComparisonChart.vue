<template>
  <div class="comparison-chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
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

import { ref, onMounted, computed } from 'vue'
import { getTerminals, getOrders } from '../services/terminalService.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const terminals = ref([])
const orders = ref([])

onMounted(async () => {
  terminals.value = await getTerminals()
  orders.value = await getOrders()
})

const chartData = computed(() => {
  const labels = terminals.value.map(t => t.name)
  const data = labels.map(name => {
    const relatedOrders = orders.value.filter(o => o.terminal === name)
    return relatedOrders.reduce((sum, o) => {
      return sum + o.products.reduce((g, p) => g + Number(p.quantity || 0), 0)
    }, 0)
  })

  return {
    labels,
    datasets: [
      {
        label: 'Total de galones',
        data,
        backgroundColor: '#3b82f6'
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Demanda por Terminal'
    }
  }
}
</script>

<style scoped>
.comparison-chart {
  margin-top: 2rem;
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
</style>
