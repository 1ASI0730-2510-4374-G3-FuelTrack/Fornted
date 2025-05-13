<template>
  <section class="orders-list">
    <h1>My orders </h1>

    <!-- Filtros -->
    <FiltersPanel @filter="applyFilters" />

    <!-- Botón crear orden -->
    <button @click="showModal = true" class="create-btn">
      <i class="ph ph-plus-circle"></i> Crear orden
    </button>

    <!-- Tabla de órdenes -->
    <OrdersTable :orders="paginatedOrders" />

    <!-- Controles de paginación -->
    <PaginationControls
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="filteredOrders.length"
        :items-per-page="itemsPerPage"
        @change="handlePageChange"
        @limitChange="handleLimitChange"
    />

    <!-- Modal de creación de orden -->
    <CreateOrderModal v-if="showModal" @close="handleModalClose" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FiltersPanel from '@/domains/client/orders/components/FiltersPanel.vue'
import OrdersTable from '@/domains/client/orders/components/OrdersTable.vue'
import PaginationControls from '@/domains/client/orders/components/PaginationControls.vue'
import CreateOrderModal from '@/domains/client/orders/components/CreateOrderModal/CreateOrderModal.vue'
import { getOrders } from '@/domains/client/orders/services/orderService.js'

// Estado reactivo
const orders = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(13)
const showModal = ref(false)

const statusFilter = ref('')
const startDateFilter = ref('')
const endDateFilter = ref('')

// Obtener data al montar
onMounted(async () => {
  orders.value = await getOrders()
})

// Aplicar filtros desde panel
function applyFilters(filters) {
  statusFilter.value = filters.status
  startDateFilter.value = filters.startDate
  endDateFilter.value = filters.endDate
  currentPage.value = 1
}

// Filtro combinado
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const orderDate = new Date(order.created)

    const matchStatus = !statusFilter.value || order.status === statusFilter.value
    const matchStart = !startDateFilter.value || orderDate >= new Date(startDateFilter.value)
    const matchEnd = !endDateFilter.value || orderDate <= new Date(endDateFilter.value)

    return matchStatus && matchStart && matchEnd
  })
})

// Paginación
const totalPages = computed(() => {
  return Math.ceil(filteredOrders.value.length / itemsPerPage.value)
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredOrders.value.slice(start, start + itemsPerPage.value)
})

// Navegación
function handlePageChange(newPage) {
  currentPage.value = newPage
}

function handleLimitChange(newLimit) {
  itemsPerPage.value = newLimit
  currentPage.value = 1
}

async function handleModalClose() {
  showModal.value = false
  orders.value = await getOrders()
}
</script>

<style scoped>
.orders-list {
  padding: 2rem;
}

.create-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #10b981;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}

.create-btn:hover {
  background-color: #059669;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.6);
}

.create-btn:active {
  transform: scale(0.97);
}
</style>
