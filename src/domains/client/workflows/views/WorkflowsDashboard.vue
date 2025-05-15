<template>
  <div class="workflows-dashboard">
    <header class="section-title">
      <i class="ph ph-flow-arrow"></i>
      Flujos de Órdenes
    </header>

    <!-- Tarjetas de workflow -->
    <section class="workflow-grid">
      <OrderWorkflowCard
          v-for="order in workflows"
          :key="order.id"
          :order="order"
      />
    </section>

    <!-- Mapa de envíos -->
    <section class="panel-section">
      <h3 class="panel-title">
        <i class="ph ph-map-pin-line"></i> Envíos en Ruta
      </h3>
      <WorkflowMap />
    </section>

    <!-- Línea de tiempo -->
    <section class="panel-section">
      <h3 class="panel-title">
        <i class="ph ph-clock-countdown"></i> Línea de Tiempo Global
      </h3>
      <WorkflowTimeline :orders="workflows" />
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getWorkflows } from '../services/workflowService.js'

import OrderWorkflowCard from '../components/OrderWorkflowCard.vue'
import WorkflowMap from '../components/WorkflowMap.vue'
import WorkflowTimeline from '../components/WorkflowTimeline.vue'

const workflows = ref([])

onMounted(async () => {
  workflows.value = await getWorkflows()
})
</script>

<style scoped>
.workflows-dashboard {
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.workflow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.panel-section {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.panel-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
