<template>
  <div class="operator-list">
    <div v-if="topOperators.length === 0" class="empty-msg">
      <i class="ph ph-user-x"></i> No hay operadores registrados aún.
    </div>
    <div
        v-else
        v-for="op in topOperators"
        :key="op.name"
        class="operator-card"
    >
      <i class="ph ph-user-circle"></i>
      <div>
        <strong>{{ op.name }}</strong>
        <p>{{ op.count }} ordenes registradas</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  }
})

// Contar y agrupar órdenes por operador
const topOperators = computed(() => {
  if (!Array.isArray(props.orders)) return []

  const map = new Map()
  for (const o of props.orders) {
    if (!o.user) continue
    map.set(o.user, (map.get(o.user) || 0) + 1)
  }

  return [...map.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
})
</script>

<style scoped>
.operator-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.operator-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: #f9fafb;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
}

.operator-card i {
  font-size: 2rem;
  color: #0ea5e9;
}

.operator-card strong {
  font-size: 1rem;
  color: #0f172a;
}

.operator-card p {
  font-size: 0.8rem;
  color: #64748b;
}

.empty-msg {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
  padding: 1rem;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
}
</style>
