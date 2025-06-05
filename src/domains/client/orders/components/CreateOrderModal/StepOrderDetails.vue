<template>
  <div class="step-order-details">
    <h2 class="section-title">
      Información de la Orden
    </h2>

    <!-- Información General -->
    <div class="form-grid">
      <div class="form-field">
        <label>Responsable</label>
        <input
            v-model="responsible"
            type="text"
            placeholder="Nombre completo"
            :class="{ invalid: !responsible && submitted }"
        />
        <span v-if="!responsible && submitted" class="error">Este campo es obligatorio</span>
      </div>

      <div class="form-field">
        <label>Terminal de Despacho</label>
        <select
            v-model="terminal"
            :class="{ invalid: !terminal && submitted }"
        >
          <option disabled value="">Seleccione una terminal</option>
          <option v-for="t in terminals" :key="t" :value="t">{{ t }}</option>
        </select>
        <span v-if="!terminal && submitted" class="error">Este campo es obligatorio</span>
      </div>
    </div>

    <!-- Detalles de la Orden -->
    <h3 class="detail-title">Detalles de la Orden</h3>

    <transition-group name="fade" tag="div">
      <div
          v-for="(detail, index) in details"
          :key="index"
          class="detail-box"
      >
        <div class="detail-header">
          <strong>Detalle #{{ index + 1 }}</strong>
          <button
              v-if="details.length > 1"
              class="remove-btn"
              @click="removeDetail(index)"
          >
            ✕
          </button>
        </div>

        <div class="form-grid">
          <div class="form-field">
            <label>Combustible</label>
            <select
                v-model="detail.product"
                @change="updateTotalPrice(detail)"
                :class="{ invalid: !detail.product && submitted }"
            >
              <option disabled value="">Seleccione un combustible</option>
              <option
                  v-for="f in fuels"
                  :key="f.type"
                  :value="f.type"
              >
                {{ f.type }}
              </option>
            </select>
            <span v-if="!detail.product && submitted" class="error">Este campo es obligatorio</span>
          </div>

          <div class="form-field">
            <label>Cantidad</label>
            <input
                type="number"
                min="1"
                v-model.number="detail.quantity"
                @input="updateTotalPrice(detail)"
                placeholder="Ingrese la cantidad"
                :class="{ invalid: (!detail.quantity || detail.quantity <= 0) && submitted }"
            />
            <span v-if="(!detail.quantity || detail.quantity <= 0) && submitted" class="error">Este campo es obligatorio</span>
          </div>

          <div class="form-field">
            <label>Total</label>
            <input type="text" :value="detail.totalPrice" disabled />
          </div>
        </div>

        <div class="form-field full-width">
          <label>Nota (Opcional)</label>
          <textarea
              v-model="detail.note"
              rows="2"
              placeholder="Escriba una nota"
          />
        </div>
      </div>
    </transition-group>

    <!-- Botón Añadir Detalle -->
    <button class="add-btn" @click="addDetail">
      + Añadir Detalle
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getFuels } from '@/domains/client/orders/services/fuelService.js'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'invalid'])

const submitted = ref(false)

const responsible = ref(props.modelValue.fullName)
const terminal = ref(props.modelValue.terminal)
const details = ref([...props.modelValue.details])
const fuels = ref([])
const terminals = ['Callao', 'Lurín', 'Pisco', 'Monte Azul']

onMounted(async () => {
  fuels.value = await getFuels()
})

function updateTotalPrice(detail) {
  const fuel = fuels.value.find(f => f.type === detail.product)
  const price = fuel ? parseFloat(fuel.pricePerGal.replace('S/', '').trim()) : 0
  const quantity = detail.quantity || 0
  detail.totalPrice = `S/ ${(price * quantity).toFixed(2)}`
}

function addDetail() {
  details.value.push({
    product: '',
    quantity: 0,
    note: '',
    totalPrice: 'S/ 0.00'
  })
}

function removeDetail(index) {
  details.value.splice(index, 1)
}

// Sincronización y validación en tiempo real
watch([responsible, terminal, details], () => {
  emit('update:modelValue', {
    ...props.modelValue,
    fullName: responsible.value,
    terminal: terminal.value,
    details: details.value
  })

  submitted.value = true
  const invalid = !responsible.value || !terminal.value || details.value.some(d => !d.product || d.quantity <= 0)
  if (invalid) emit('invalid')
}, { deep: true })
</script>

<style scoped>
.step-order-details {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: 70vh;
  scrollbar-gutter: stable;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.detail-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
  color: #1f2937;
}

.detail-box {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.25rem;
  background-color: #f9fafb;
  transition: box-shadow 0.2s ease;
}

.detail-box:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: #1f2937;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #dc2626;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-field {
  flex: 1 1 280px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 500;
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  color: #4b5563;
}

input,
select,
textarea {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  background-color: #ffffff;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 60px;
  max-height: 150px;
}

input.invalid,
select.invalid {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.error {
  font-size: 0.75rem;
  color: #dc2626;
  margin-top: 0.25rem;
}

.full-width {
  width: 100%;
}

.add-btn {
  margin-top: 1.25rem;
  background-color: #3b82f6;
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 6px;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-btn:hover {
  background-color: #2563eb;
}

.add-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
