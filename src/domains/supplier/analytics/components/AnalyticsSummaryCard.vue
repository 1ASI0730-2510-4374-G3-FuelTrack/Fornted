<template>
  <div class="summary-card">
    <h3 class="title">{{ title }}</h3>
    <p class="value">{{ formattedValue }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number]
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString('en-US')
  }
  return props.value
})
</script>

<style scoped>
.summary-card {
  flex: 1;
  min-width: 220px;
  background-color: #1e2e4a;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  text-align: center;
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-3px);
}

.title {
  font-size: 1rem;
  font-weight: 500;
  color: #cbd5e1;
  margin-bottom: 0.5rem;
}

.value {
  font-size: 1.6rem;
  font-weight: bold;
  color: #22c55e;
}
</style>
