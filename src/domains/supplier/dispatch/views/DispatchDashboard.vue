<template>
  <section class="dispatch-dashboard">
    <!-- HEADER: Fiel a Figma -->
    <DispatchHeader
        :hasSelected="selectedOrderIds.length > 0"
        @release="releaseSelectedOrders"
    />

    <!-- TABLA -->
    <DispatchTable
        :orders="orders"
        @select="handleSelectOrder"
        @updated="fetchOrders"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getApprovedOrders, markAsReleased } from '../services/dispatchService'
import DispatchHeader from '../components/DispatchHeader.vue'
import DispatchTable from '../components/DispatchTable.vue'
import { error as logError } from '@/services/logger'

const orders = ref([])
const selectedOrderIds = ref([])

// Obtener las órdenes aprobadas desde db.json
async function fetchOrders() {
  try {
    const data = await getApprovedOrders()
    orders.value = data
  } catch (error) {
    logError('Error fetching dispatch orders:', error)
  }
}

// Manejar selección individual por checkbox
function handleSelectOrder({ id, selected }) {
  if (selected) {
    if (!selectedOrderIds.value.includes(id)) {
      selectedOrderIds.value.push(id)
    }
  } else {
    selectedOrderIds.value = selectedOrderIds.value.filter(o => o !== id)
  }
}

// Liberar todas las órdenes seleccionadas
async function releaseSelectedOrders() {
  for (const id of selectedOrderIds.value) {
    await markAsReleased(id)
  }
  selectedOrderIds.value = []
  await fetchOrders()
}

// Cargar órdenes al iniciar
onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.dispatch-dashboard {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}
</style>
