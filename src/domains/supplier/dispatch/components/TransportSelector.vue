<template>
  <div class="transport-selector">
    <div class="selector-row">
      <select v-model="selectedTruckId">
        <option disabled value="">select truck</option>
        <option
            v-for="truck in trucks"
            :key="truck.id"
            :value="truck.id"
        >
          {{ truck.plate }} — {{ truck.driver }}
        </option>
      </select>

      <input
          type="text"
          :value="selectedTruck?.driver || ''"
          placeholder="select driver"
          readonly
          :disabled="!selectedTruck"
      />

      <input
          type="text"
          :value="selectedTruck ? `${selectedTruck.quantity} gal` : ''"
          placeholder="select tank"
          readonly
          :disabled="!selectedTruck"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  trucks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:transport'])

const selectedTruckId = ref('')

const selectedTruck = computed(() =>
    props.trucks.find(t => t.id === selectedTruckId.value)
)

watch(selectedTruck, (truck) => {
  if (truck) {
    emit('update:transport', {
      id: truck.id,
      plate: truck.plate,
      driver: truck.driver,
      quantity: truck.quantity,
      fuel: truck.fuel
    })
  } else {
    emit('update:transport', null)
  }
})
</script>

<style scoped>
.transport-selector {
  width: 100%;
}

.selector-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

select,
input {
  flex: 1;
  background-color: #1e2e4a;
  border: 1px solid #334155;
  border-radius: 6px;
  padding: 0.45rem 0.6rem;
  color: #ffffff;
  font-size: 0.85rem;
}

select:focus,
input:focus {
  outline: none;
  border-color: #4ade80;
}

input[readonly] {
  background-color: #1e2e4a;
  cursor: not-allowed;
  color: #cbd5e1;
}

input:disabled {
  opacity: 0.5;
}
</style>
