<template>
  <button
      class="approve-btn"
      :class="{ approved }"
      @click="$emit('approve')"
  >
    <i :class="['ph', approved ? 'ph-check-circle' : 'ph-check']"></i>
    {{ approved ? 'Approved' : 'Approve' }}
  </button>
</template>

<script setup>
const props = defineProps({
  approved: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['approve'])
</script>

<style scoped>
.approve-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: #1e3a5f;
  color: #cbd5e1;
}

.approve-btn:hover {
  background-color: #2c4d75;
}

.approve-btn.approved {
  background-color: #22c55e33;
  color: #22c55e;
  cursor: default;
}

.approve-btn.approved:hover {
  background-color: #22c55e33;
}
</style>
