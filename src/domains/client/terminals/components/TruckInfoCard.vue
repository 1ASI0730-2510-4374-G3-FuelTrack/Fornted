<template>
  <div class="truck-info-card">
    <h3><i class="ph ph-truck"></i> {{ truck.plate }}</h3>
    <ul class="details">
      <li><i class="ph ph-user"></i> Conductor: {{ truck.driver }}</li>
      <li><i class="ph ph-map-pin"></i> Origen: {{ truck.origin }}</li>
      <li><i class="ph ph-gas-pump"></i> Combustible: {{ truck.fuel }} - {{ truck.quantity }} gal</li>
      <li><i class="ph ph-clock"></i> Estado: {{ truck.status }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  truck: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.truck-info-card {
  background: #ffffff;
  padding: 1.2rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  color: #1e293b;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
}

.truck-info-card h3 {
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.details li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #334155;
}

.details i {
  color: #0ea5e9;
  font-size: 1rem;
}
</style>
