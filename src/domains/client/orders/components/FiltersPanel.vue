<template>
  <div class="filters-panel">
    <!-- Totales con badges -->
    <div class="totals">
      <div class="item">
        <strong>{{ totalOrders }}</strong>
        <span>{{ $t('orders.filters.total') }}</span>
      </div>

      <div class="divider" />

      <div class="item status-badge approved">
        {{ approved }}
        <span>{{ $t('orders.filters.approved') }}</span>
      </div>

      <div class="divider" />

      <div class="item status-badge requested">
        {{ requested }}
        <span>{{ $t('orders.filters.requested') }}</span>
      </div>


    </div>

    <!-- Controles a la derecha -->
    <div class="actions">
      <div class="relative">
        <button class="filter-button" @click="toggleDropdown">
          <i class="ph ph-funnel-simple"></i> {{ $t('orders.filters.filters') }}
        </button>

        <div v-if="showDropdown" class="dropdown">
          <label>{{ $t('orders.filters.state') }}:</label>
          <select v-model="status">
            <option value="">{{ $t('orders.filters.all') }}</option>
            <option value="Requested">{{ $t('orders.filters.requested') }}</option>
            <option value="Approved">{{ $t('orders.filters.approved') }}</option>
            <option value="Released">{{ $t('orders.filters.released') }}</option>
            <option value="Closed">{{ $t('orders.filters.closed') }}</option>
          </select>

          <label>{{ $t('orders.filters.from') }}:</label>
          <input type="date" v-model="startDate" />

          <label>{{ $t('orders.filters.to') }}:</label>
          <input type="date" v-model="endDate" />

          <button class="apply-btn" @click="applyFilters">
            <i class="ph ph-check-circle"></i> {{ $t('orders.filters.apply') }}
          </button>
        </div>
      </div>

      <!-- Chips -->
      <div class="active-chips" v-if="hasActiveFilters">
        <span v-if="status" class="chip">
          <i class="ph ph-tag"></i> {{ status }}
          <i class="ph ph-x" @click="clearFilter('status')"></i>
        </span>
        <span v-if="startDate" class="chip">
          <i class="ph ph-calendar-blank"></i> {{ $t('orders.filters.from') }} {{ startDate }}
          <i class="ph ph-x" @click="clearFilter('start')"></i>
        </span>
        <span v-if="endDate" class="chip">
          <i class="ph ph-calendar-blank"></i> {{ $t('orders.filters.to') }} {{ endDate }}
          <i class="ph ph-x" @click="clearFilter('end')"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getOrders } from '@/domains/client/orders/services/orderService.js'
import type { Order } from '@/domains/client/orders/models/Order'

const orders = ref<Order[]>([])

const status = ref('')
const startDate = ref('')
const endDate = ref('')
const showDropdown = ref(false)

onMounted(async () => {
  orders.value = await getOrders()
})

const totalOrders = computed(() => orders.value.length)
const approved = computed(() => orders.value.filter(o => o.status === 'Approved').length)
const requested = computed(() => orders.value.filter(o => o.status === 'Requested').length)
const released = computed(() => orders.value.filter(o => o.status === 'Released').length)
const closed = computed(() => orders.value.filter(o => o.status === 'Closed').length)

const emit = defineEmits<{
  (e: 'filter', payload: { status: string; startDate: string; endDate: string }): void
}>()

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function applyFilters() {
  emit('filter', {
    status: status.value,
    startDate: startDate.value,
    endDate: endDate.value
  })
  showDropdown.value = false
}

function clearFilter(type: 'status' | 'start' | 'end') {
  if (type === 'status') status.value = ''
  if (type === 'start') startDate.value = ''
  if (type === 'end') endDate.value = ''
  applyFilters()
}

const hasActiveFilters = computed(() =>
    status.value || startDate.value || endDate.value
)
</script>

<style scoped>
.filters-panel {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  gap: 1.5rem;
}

.totals {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.totals .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 500;
  color: #475569;
  min-width: 70px;
}

.totals .item strong {
  font-size: 1.25rem;
  color: #0f172a;
  font-weight: 700;
  line-height: 1.2;
}

.divider {
  width: 1px;
  height: 24px;
  background-color: #e2e8f0;
  margin: 0 0.25rem;
}
.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid #cbd5e1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.filter-button:hover {
  background-color: #f1f5f9;
}

.relative {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 2.8rem;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  width: 250px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  z-index: 50;
}

.dropdown label {
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #334155;
}

.dropdown select,
.dropdown input {
  width: 100%;
  padding: 0.4rem;
  margin-bottom: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.85rem;
}

.apply-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  background-color: #0ea5e9;
  color: white;
  font-weight: 500;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.apply-btn:hover {
  background-color: #0284c7;
}

.active-chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}

.chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #334155;
  cursor: default;
}

.chip i.ph-x {
  cursor: pointer;
  font-size: 0.85rem;
  color: #64748b;
  transition: color 0.2s;
}

.chip i.ph-x:hover {
  color: #ef4444;
}

/* Badges por estado */
.status-badge.approved {
  background-color: #ffffff;
  color: #92400e;
}

.status-badge.requested {
  background-color: #ffffff;
  color: #065f46;
}

.status-badge.released {
  background-color: #dbeafe;
  color: #1e3a8a;
}

.status-badge.closed {
  background-color: #e5e7eb;
  color: #374151;
}
</style>
