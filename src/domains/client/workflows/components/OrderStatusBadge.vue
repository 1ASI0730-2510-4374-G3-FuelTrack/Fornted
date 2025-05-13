<template>
  <span
      class="status-badge"
      :class="badgeClass"
      role="status"
      :aria-label="`Estado: ${status}`"
  >
    {{ status }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  }
})

const badgeClass = computed(() => {
  const normalized = props.status?.toLowerCase() || ''
  return {
    'badge-requested': normalized === 'requested',
    'badge-approved': normalized === 'approved',
    'badge-released': normalized === 'released',
    'badge-closed': normalized === 'closed',
    'badge-default': !['requested', 'approved', 'released', 'closed'].includes(normalized)
  }
})
</script>

<style scoped>
.status-badge {
  padding: 0.35rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
}

/* Colores por estado */
.badge-requested {
  background-color: #ecfdf5;
  color: #047857;
}

.badge-approved {
  background-color: #fef9c3;
  color: #92400e;
}

.badge-released {
  background-color: #eff6ff;
  color: #1d4ed8;
}

.badge-closed {
  background-color: #f4f4f5;
  color: #374151;
}

.badge-default {
  background-color: #f3f4f6;
  color: #6b7280;
}
</style>
