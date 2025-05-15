<template>
  <div class="analytics-header">
    <div class="breadcrumb">
      <span class="home">Home</span>
      <span class="separator">/</span>
      <span class="current">Analytics</span>
    </div>
    <h1>Analytics</h1>
  </div>
</template>

<script setup>
// No se necesita JS por ahora
</script>

<style scoped>
.analytics-header {
  margin-bottom: 1.5rem;
}

.breadcrumb {
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.breadcrumb .home {
  cursor: pointer;
}

.breadcrumb .current {
  font-weight: 500;
  color: #1f2937;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}
</style>
