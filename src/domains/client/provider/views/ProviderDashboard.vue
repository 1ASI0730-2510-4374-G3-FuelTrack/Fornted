<template>
  <div class="provider-dashboard">
    <header class="header">
      <h2><i class="ph ph-briefcase"></i> Proveedores Asociados</h2>
    </header>

    <ProvidersStats />

    <section class="list-section">
      <h3><i class="ph ph-list-bullets"></i> Lista de Proveedores</h3>
      <ProviderList />
    </section>
  </div>
</template>

<script setup>
import ProvidersStats from '../components/ProviderStats.vue'
import ProviderList from '../components/ProviderList.vue'
</script>

<style scoped>
.provider-dashboard {
  padding: 2rem;
  background: #f9fafb;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
}

.list-section {
  margin-top: 2rem;
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.list-section h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #0f172a;
}
</style>
