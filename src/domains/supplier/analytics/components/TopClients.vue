<template>
  <div class="top-clients">
    <h2 class="chart-title">Top Clients</h2>

    <ul class="client-list">
      <li v-for="(client, index) in topClients" :key="index" class="client-item">
        <div class="client-info">
          <span class="rank">#{{ index + 1 }}</span>
          <span class="name">{{ client.name }}</span>
        </div>
        <span class="volume">{{ client.volume.toLocaleString() }} gal</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    required: true
  }
})

// Calcular el volumen total entregado por cliente
const topClients = computed(() => {
  const map = {}

  props.orders.forEach(order => {
    const user = order.user
    const volume = order.products.reduce((sum, p) => sum + Number(p.quantity), 0)

    if (!map[user]) {
      map[user] = volume
    } else {
      map[user] += volume
    }
  })

  return Object.entries(map)
      .map(([name, volume]) => ({ name, volume }))
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5) // top 5 clientes
})
</script>

<style scoped>
.top-clients {
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

.client-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.client-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid #334155;
  color: #e2e8f0;
}

.client-info {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.rank {
  font-weight: bold;
  color: #22c55e;
}

.name {
  font-weight: 500;
  font-size: 0.95rem;
}

.volume {
  font-weight: bold;
  font-size: 0.9rem;
}
</style>
