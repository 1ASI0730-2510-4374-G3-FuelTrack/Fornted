<template>
  <div class="stepper">
    <div
        v-for="(step, index) in steps"
        :key="index"
        class="step"
    >
      <div
          class="circle"
          :class="{
          active: currentStep === index + 1,
          completed: currentStep > index + 1
        }"
          :title="step.label"
      >
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

      <span
          class="label"
          :class="{
          'active-text': currentStep === index + 1,
          'completed-text': currentStep > index + 1
        }"
      >
        {{ step.label }}
      </span>

      <div v-if="index < steps.length - 1" class="line" />
    </div>
  </div>
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
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  min-width: 80px;
}

.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #cbd5e1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  z-index: 1;
}

.circle.active {
  background-color: #0ea5e9;
  transform: scale(1.1);
}

.circle.completed {
  background-color: #10b981;
}

.label {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: #64748b;
  text-align: center;
  transition: color 0.3s;
}

.label.active-text {
  color: #0ea5e9;
  font-weight: 600;
}

.label.completed-text {
  color: #10b981;
}

.line {
  position: absolute;
  top: 20px;
  left: 50%;
  right: -50%;
  height: 2px;
  background-color: #cbd5e1;
  z-index: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
