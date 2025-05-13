<template>
  <div class="status-chips">
    <button
        v-for="status in statuses"
        :key="status.value"
        :class="['chip', { active: selected === status.value }]"
        :style="getStyle(status.value, selected === status.value)"
        @click="$emit('update:selected', status.value)"
    >
      <i :class="['ph', getIcon(status.value)]"></i>
      <span class="label">{{ status.label }}</span>
      <span class="count">{{ formatCount(status.count) }}</span>
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  statuses: Array,
  selected: String
})
const emit = defineEmits(['update:selected'])

function formatCount(count) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(2) + 'K'
  return count
}

const colorMap = {
  Requested: '#f97316',
  Approved: '#3b82f6',
  Released: '#6366f1',
  Dispatched: '#0ea5e9',
  Closed: '#64748b'
}

const iconMap = {
  Requested: 'ph-clock',
  Approved: 'ph-check-circle',
  Released: 'ph-upload',
  Dispatched: 'ph-truck',
  Closed: 'ph-lock'
}

function getStyle(status, isActive) {
  const color = colorMap[status] || '#cbd5e1'
  return {
    border: `1px solid ${isActive ? 'transparent' : '#ffffff33'}`,
    backgroundColor: isActive ? `${color}33` : 'transparent',
    color: isActive ? color : '#ffffff'
  }
}

function getIcon(status) {
  return iconMap[status] || 'ph-circle'
}
</script>

<style scoped>
.status-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.chip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1rem;
  border-radius: 16px;
  font-size: 0.86rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  min-width: 140px;
}

.chip i {
  font-size: 1rem;
}

.label {
  text-transform: capitalize;
}

.count {
  background-color: #1e2e4a;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 600;
}
</style>
