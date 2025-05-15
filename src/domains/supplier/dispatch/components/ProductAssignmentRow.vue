<template>
  <div class="product-row">
    <div class="info">
      <div class="line">
        <span class="label">Product:</span>
        <span class="value">{{ product.product }}</span>
      </div>
      <div class="line">
        <span class="label">Quantity:</span>
        <span class="value">{{ product.quantity }} {{ product.unit }}</span>
      </div>
      <div class="line">
        <span class="label">Total:</span>
        <span class="value">{{ formatCurrency(product.total) }}</span>
      </div>
    </div>

    <div class="actions">
      <button class="gear-btn" @click="$emit('openModal', product)">
        <i class="ph ph-gear"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  orderId: {
    type: [Number, String],
    required: true
  }
})

function formatCurrency(value) {
  const val = parseFloat(value)
  if (isNaN(val)) return 'S/ 0.00'
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(val).replace('PEN', 'S/')
}
</script>

<style scoped>
.product-row {
  background-color: #1e2e4a;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.line {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.label {
  font-weight: 500;
  color: #cbd5e1;
}

.value {
  font-weight: 600;
  color: #ffffff;
}

.actions {
  display: flex;
  align-items: center;
}

.gear-btn {
  background: none;
  border: none;
  color: #facc15;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.gear-btn:hover {
  transform: rotate(20deg);
}
</style>
