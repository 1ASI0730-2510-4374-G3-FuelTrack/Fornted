<template>
  <section class="conciliations-dashboard">
    <!-- Header con KPIs y botones -->
    <ConciliationsHeader
        :totalOrders="orders.length"
        :totalApproved="getStatusCount('Approved')"
        :totalRequested="getStatusCount('Requested')"
    />

    <!-- Tabla de conciliaciones -->
    <ConciliationTable
        :orders="orders"
        @approve="handleApprove"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ConciliationsHeader from '../components/ConciliationsHeader.vue'
import ConciliationTable from '../components/ConciliationTable.vue'
import { getConciliations, approveOrder } from '../services/conciliationService.js'

const orders = ref([])

onMounted(async () => {
  orders.value = await getConciliations()
})

function getStatusCount(status) {
  return orders.value.filter(order => order.status === status).length
}

function handleApprove(order) {
  order.status = 'Approved'
  order.approved = true
  order.approvable = false

  approveOrder(order.id)
      .then(() => {
        console.log(`Orden ${order.id} aprobada correctamente.`)
      })
      .catch(error => {
        console.error(`Error al aprobar la orden ${order.id}:`, error)
      })
}
</script>

<style scoped>
.conciliations-dashboard {
  padding: 2rem;
  background-color: #0c1f3a;
  min-height: 100vh;
  color: #ffffff;
}
</style>
