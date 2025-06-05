<template>
  <nav aria-label="Pasos del proceso" class="stepper">
    <ol class="step-list">
      <li
          v-for="(step, index) in steps"
          :key="index"
          class="step-item"
          :class="{
          active: currentStep === index + 1,
          completed: currentStep > index + 1
        }"
          :aria-current="currentStep === index + 1 ? 'step' : null"
      >
        <div class="circle">
          <Transition name="fade">
            <i
                v-if="currentStep > index + 1"
                class="ph ph-check-bold"
                key="check"
            />
            <i
                v-else
                :class="step.icon"
                key="icon"
            />
          </Transition>
        </div>
        <span class="step-label">{{ step.label }}</span>
        <div v-if="index < steps.length - 1" class="line" />
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number
}>()

const steps = [
  { label: 'Orden', icon: 'ph ph-clipboard-text' },
  { label: 'Pago', icon: 'ph ph-bank' },
  { label: 'Confirmar', icon: 'ph ph-check-circle' }
]
</script>

<style scoped>
.stepper {
  display: flex;
  justify-content: center;
  background-color: #f8fafc;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.step-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  width: 100%;
  max-width: 760px;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  text-align: center;
}

.circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  transition: all 0.25s ease-in-out;
  z-index: 2;
}

.step-item.active .circle {
  background-color: #0ea5e9;
  transform: scale(1.1);
}

.step-item.completed .circle {
  background-color: #10b981;
}

.step-label {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
  transition: color 0.3s;
}

.step-item.active .step-label {
  color: #0ea5e9;
  font-weight: 600;
}

.step-item.completed .step-label {
  color: #10b981;
}

.line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background-color: #cbd5e1;
  z-index: 1;
  transform: translateX(50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>
