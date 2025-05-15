<template>
  <div class="weekly-chart">
    <div class="chart-container">
      <h3 class="chart-title">Consumo por tipo de combustible</h3>
      <Bar :data="filteredBarData" :options="chartOptions" />
    </div>

    <div class="chart-container">
      <h3 class="chart-title">Volumen total despachado (galones)</h3>
      <Line :data="filteredLineData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
)

const props = defineProps({
  terminal: String
})

const labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

// Datos de ejemplo por terminal (simulado)
const chartSource = {
  DieselB5: {
    Callao: [100, 80, 95, 85, 110, 130, 70],
    Pisco: [120, 95, 130, 110, 150, 180, 90],
    default: [90, 60, 80, 70, 100, 120, 60]
  },
  GLP: {
    Callao: [60, 50, 70, 65, 85, 95, 55],
    Pisco: [80, 60, 90, 85, 95, 100, 70],
    default: [55, 45, 65, 60, 75, 85, 50]
  },
  GNV: {
    Callao: [40, 60, 35, 55, 60, 70, 35],
    Pisco: [50, 70, 40, 65, 75, 85, 40],
    default: [35, 45, 30, 50, 55, 65, 30]
  }
}

const filteredBarData = computed(() => {
  const t = props.terminal || 'default'
  return {
    labels,
    datasets: [
      {
        label: 'Diesel B5',
        data: chartSource.DieselB5[t] || chartSource.DieselB5.default,
        backgroundColor: '#10b981'
      },
      {
        label: 'GLP',
        data: chartSource.GLP[t] || chartSource.GLP.default,
        backgroundColor: '#3b82f6'
      },
      {
        label: 'GNV',
        data: chartSource.GNV[t] || chartSource.GNV.default,
        backgroundColor: '#f59e0b'
      }
    ]
  }
})

const filteredLineData = computed(() => {
  const bar = filteredBarData.value.datasets
  const total = bar[0].data.map((_, i) =>
      bar.reduce((acc, dataset) => acc + dataset.data[i], 0)
  )
  return {
    labels,
    datasets: [
      {
        label: 'Total galones',
        data: total,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14,165,233,0.2)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#0ea5e9'
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#334155',
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      callbacks: {
        label: context => `${context.dataset.label}: ${context.raw} gal`
      }
    }
  },
  scales: {
    y: {
      ticks: {
        color: '#64748b',
        font: {
          size: 12
        }
      },
      grid: {
        color: '#e2e8f0'
      }
    },
    x: {
      ticks: {
        color: '#64748b',
        font: {
          size: 12
        }
      },
      grid: {
        display: false
      }
    }
  }
}
</script>

<style scoped>
.weekly-chart {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.chart-container {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
  height: 360px;
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e293b;
}
</style>
