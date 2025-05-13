<template>
  <div class="workflow-timeline">
    <div
        v-for="(step, index) in steps"
        :key="index"
        class="timeline-step"
        :class="{ active: index <= currentStep, completed: index < currentStep }"
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :enter="{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }"
    >
      <div class="circle">
        <i :class="step.icon"></i>
        <div v-if="index < currentStep" class="checkmark">
          <i class="ph ph-check"></i>
        </div>
      </div>

      <div class="info">
        <h4>{{ step.label }}</h4>
        <p :class="{ done: index <= currentStep }">
          {{ index < currentStep ? 'Completado' : index === currentStep ? 'En proceso' : 'Pendiente' }}
        </p>
      </div>
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progressPercent + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMotion } from '@vueuse/motion'

const steps = [
  { label: 'Creado', icon: 'ph ph-pencil' },
  { label: 'Aprobado', icon: 'ph ph-check-circle' },
  { label: 'En ruta', icon: 'ph ph-truck' },
  { label: 'Entregado', icon: 'ph ph-flag-checkered' }
]

// Simulación: hasta cuál paso llegó
const currentStep = 2

const progressPercent = computed(() => ((currentStep + 1) / steps.length) * 100)
</script>

<style scoped>
.workflow-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1rem 0;
}

.timeline-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.5;
  transition: all 0.3s ease;
  transform: scale(0.95);
}

.timeline-step.active {
  opacity: 1;
  transform: scale(1);
}

.timeline-step.completed .circle {
  background-color: #22c55e;
  color: white;
}

.circle {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0ea5e9;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.checkmark {
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: white;
  color: #22c55e;
  border-radius: 50%;
  font-size: 0.7rem;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.info h4 {
  font-size: 0.9rem;
  margin: 0;
  color: #0f172a;
}

.info p {
  font-size: 0.75rem;
  margin: 0;
  color: #64748b;
}

.info p.done {
  color: #22c55e;
  font-weight: 600;
}

.progress-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 1rem;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #0ea5e9, #22c55e);
  transition: width 0.4s ease;
}
</style>
