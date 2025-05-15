<template>
  <div class="price-list">
    <table>
      <thead>
      <tr>
        <th>Fuel Type</th>
        <th>Current Price</th>
        <th>New Price</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="fuel in editableFuels" :key="fuel.id">
        <td>{{ fuel.type }}</td>
        <td>{{ fuel.pricePerGal }}</td>
        <td>
          <input
              type="number"
              v-model="fuel.newPrice"
              min="0"
              step="0.01"
              placeholder="S/ 0.00"
          />
        </td>
        <td>
          <button
              class="save-btn"
              :disabled="!isPriceValid(fuel)"
              @click="updatePrice(fuel)"
          >
            Save
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  fuels: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update'])

const editableFuels = ref([])

watch(
    () => props.fuels,
    (newFuels) => {
      editableFuels.value = newFuels.map(f => ({
        ...f,
        newPrice: ''
      }))
    },
    { immediate: true }
)

function isPriceValid(fuel) {
  const val = parseFloat(fuel.newPrice)
  return !isNaN(val) && val > 0
}

function updatePrice(fuel) {
  emit('update', { id: fuel.id, newPrice: fuel.newPrice })
  fuel.newPrice = ''
}
</script>

<style scoped>
.price-list {
  background-color: #1e2e4a;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

table {
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
}

thead {
  background-color: #1e3955;
}

th, td {
  padding: 1rem;
  text-align: left;
  font-size: 0.9rem;
  border-bottom: 1px solid #2c445f;
}

input {
  background-color: #1a314a;
  border: 1px solid #334155;
  color: #ffffff;
  border-radius: 6px;
  padding: 0.5rem;
  width: 100px;
  font-size: 0.85rem;
}

.save-btn {
  background-color: #22c55e;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.save-btn:disabled {
  background-color: #4b5563;
  cursor: not-allowed;
}
</style>
