<template>
  <tr class="dispatch-row">
    <!-- Checkbox -->
    <td>
      <input type="checkbox" v-model="isChecked" class="checkbox" @change="emitSelection" />
    </td>

    <!-- Fecha formateada -->
    <td>{{ formattedDate }}</td>

    <!-- Cliente -->
    <td>{{ order.user }}</td>

    <!-- Monto total -->
    <td>{{ order.amount }}</td>

    <!-- Terminal -->
    <td>{{ order.terminal }}</td>

    <!-- Estado For Release -->
    <td>
      <PhCheckCircle
          v-if="order.approved"
          :size="20"
          weight="bold"
          class="icon-check"
      />
    </td>

    <!-- Cargo (ícono ⚙️) -->
    <td>
      <PhGear
          :size="22"
          weight="bold"
          class="gear-icon"
          @click="openModal(order.products[0])"
      />
    </td>

    <!-- Modal -->
    <AssignCargoModal
        v-if="showModal"
        :product="selectedProduct"
        :order-id="order.id"
        :trucks="trucks"
        :drivers="drivers"
        :tanks="tanks"
        @close="showModal = false"
    />
  </tr>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PhGear, PhCheckCircle } from '@phosphor-icons/vue'
import AssignCargoModal from './AssignCargoModal.vue'
import { getTrucks, getDrivers, getTanks } from '../services/dispatchService'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['select'])

const isChecked = ref(false)
const showModal = ref(false)
const selectedProduct = ref(null)

const trucks = ref([])
const drivers = ref([])
const tanks = ref([])

function openModal(product) {
  selectedProduct.value = product
  showModal.value = true
}

function emitSelection() {
  emit('select', { id: props.order.id, selected: isChecked.value })
}

const formattedDate = computed(() => {
  const date = new Date(props.order.created)
  const options = { day: 'numeric', month: 'short', year: 'numeric' }
  return date.toLocaleDateString('en-US', options).toUpperCase()
})

onMounted(async () => {
  trucks.value = await getTrucks()
  drivers.value = await getDrivers()
  tanks.value = await getTanks()
})
</script>

<style scoped>
.dispatch-row {
  background-color: #0c1c2f;
  transition: background-color 0.2s ease;
}

.dispatch-row:hover {
  background-color: #142b45;
}

td {
  padding: 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #1f2d44;
  color: #e2e8f0;
  vertical-align: middle;
}

.checkbox {
  accent-color: #22c55e;
  width: 16px;
  height: 16px;
}

.icon-check {
  color: #22c55e;
  cursor: default;
}

.gear-icon {
  color: #e2e8f0;
  cursor: pointer;
  transition: color 0.2s ease;
}

.gear-icon:hover {
  color: #38bdf8;
}
</style>
