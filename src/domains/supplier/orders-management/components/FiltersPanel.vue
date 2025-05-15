<template>
  <div class="filters-panel">
    <button class="filter-btn" @click="emit('applyFilters')">
      <i class="ph ph-sliders-horizontal"></i>
      <span>Filters</span>
    </button>

    <button class="filter-btn date">
      <i class="ph ph-calendar"></i>
      <span>Date Range</span>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['applyFilters'])
</script>

<style scoped>
.filters-panel {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background-color: #1e2e4a;
  color: #cbd5e1;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.filter-btn:hover {
  background-color: #243955;
}

.filter-btn i {
  font-size: 1rem;
}

.filter-btn.date {
  background-color: #2e4c6f;
}
</style>
