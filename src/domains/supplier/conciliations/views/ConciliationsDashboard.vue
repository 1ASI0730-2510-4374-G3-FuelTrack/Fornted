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
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ConciliationsHeader from '../components/ConciliationsHeader.vue'
import ConciliationTable from '../components/ConciliationTable.vue'
import { getConciliations } from '../services/conciliationService.js'

const orders = ref([])

onMounted(async () => {
  orders.value = await getConciliations()
})

function getStatusCount(status) {
  return orders.value.filter(order => order.status === status).length
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
