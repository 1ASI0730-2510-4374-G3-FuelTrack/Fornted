<template>
  <div class="dispatch-header">
    <!-- Izquierda -->
    <div class="left">
      <h1 class="title">Dispatch</h1>
      <p class="subtitle">Check your order’s payments and approve them!</p>

      <button class="release-btn" :disabled="!hasSelected" @click="$emit('release')">
        Release Orders
      </button>
    </div>

    <!-- Derecha -->
    <div class="right">
      <div class="stats">
        <div class="stat">
          <span class="value green">651.9K</span>
          <span class="label">Total Orders</span>
        </div>
        <div class="separator">|</div>
        <div class="stat">
          <span class="value green">607.78K</span>
          <span class="label">Approved</span>
        </div>
        <div class="separator">|</div>
        <div class="stat">
          <span class="value green">44.12K</span>
          <span class="label">Requested</span>
        </div>
      </div>

      <div class="filters">
        <button class="filter-btn">
          <PhSlidersHorizontal :size="18" /> Filters
        </button>
        <button class="filter-btn">
          <PhCalendarBlank :size="18" /> Date Range
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhCalendarBlank, PhSlidersHorizontal } from '@phosphor-icons/vue'

defineProps({
  hasSelected: Boolean
})
defineEmits(['release'])
</script>

<style scoped>
.dispatch-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 0;
  gap: 2rem;
  flex-wrap: wrap;
}

.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.title {
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: bold;
}

.subtitle {
  color: #cbd5e1;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
}

.release-btn {
  background-color: #f97316;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  width: fit-content;
}

.release-btn:disabled {
  background-color: #f9731670;
  cursor: not-allowed;
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.stats {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-weight: bold;
  font-size: 1rem;
}

.value.green {
  color: #22c55e;
}

.label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.separator {
  color: #334155;
  font-size: 1.2rem;
}

.filters {
  display: flex;
  gap: 0.6rem;
}

.filter-btn {
  background-color: #1e2e4a;
  color: #cbd5e1;
  border: 1px solid #334155;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
</style>
