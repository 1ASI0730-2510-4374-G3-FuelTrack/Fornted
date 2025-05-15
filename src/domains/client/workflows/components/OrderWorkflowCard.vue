<template>
  <div class="order-workflow-card">
    <header class="card-header">
      <div>
        <strong class="order-id">#{{ order.orderId }}</strong>
        <span class="date">{{ order.created }}</span>
      </div>
      <span
          class="status-badge"
          :class="statusClass"
          role="status"
          :aria-label="`Estado de orden: ${order.status}`"
      >
        {{ order.status }}
      </span>
    </header>

    <div class="card-body">
      <p><i class="ph ph-map-pin"></i> <strong>Terminal:</strong> {{ order.terminal }}</p>
      <p><i class="ph ph-user"></i> <strong>Solicitado por:</strong> {{ order.user }}</p>
      <p><i class="ph ph-gas-pump"></i> <strong>Productos:</strong> {{ totalGalones }} gal</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

// Total de galones de productos
const totalGalones = computed(() =>
    props.order.products.reduce((sum, p) => sum + p.quantity, 0)
)

// Clase para el badge según el estado
const statusClass = computed(() => {
  const s = props.order.status?.toLowerCase()
  return {
    requested: 'badge-requested',
    approved: 'badge-approved',
    released: 'badge-released',
    closed: 'badge-closed'
  }[s] || 'badge-default'
})
</script>

<style scoped>
.order-workflow-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.order-workflow-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.order-id {
  font-weight: 600;
  color: #0f172a;
}

.card-header .date {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.2rem;
}

.card-body p {
  font-size: 0.875rem;
  color: #334155;
  margin: 0.35rem 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.card-body strong {
  color: #0f172a;
}

.status-badge {
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 1;
  white-space: nowrap;
}

/* Estados */
.badge-requested {
  background-color: #d1fae5;
  color: #047857;
}
.badge-approved {
  background-color: #fef3c7;
  color: #92400e;
}
.badge-released {
  background-color: #dbeafe;
  color: #1d4ed8;
}
.badge-closed {
  background-color: #e5e7eb;
  color: #374151;
}
.badge-default {
  background-color: #f3f4f6;
  color: #6b7280;
}
</style>
