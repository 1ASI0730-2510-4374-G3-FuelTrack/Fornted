<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2 class="modal-title">Load Bank Statement</h2>

      <!-- Zona de drop / selección -->
      <div
          class="dropzone"
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="fileInput.click()"
      >
        <i class="ph ph-cloud-arrow-up icon" />
        <p class="drop-text">Click or drag files here</p>
        <small class="format-hint">PDF, XLSX and XLS formats, up to 50MB</small>
        <input
            type="file"
            accept=".pdf,.xls,.xlsx"
            multiple
            ref="fileInput"
            @change="handleFileChange"
            hidden
        />
      </div>

      <!-- Lista de archivos -->
      <div v-if="files.length" class="file-list">
        <div v-for="(file, index) in files" :key="index" class="file-card">
          <i class="ph ph-file-pdf file-icon" />
          <div class="file-info">
            <strong class="file-name">{{ file.name }}</strong>
            <small class="file-size">{{ formatSize(file.size) }}</small>
          </div>
          <button class="remove-btn" @click="removeFile(index)">
            <i class="ph ph-x" />
          </button>
        </div>
      </div>

      <!-- Acciones -->
      <div class="actions">
        <button class="btn load" @click="loadFiles">Load</button>
        <button class="btn cancel" @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'submit'])

const files = ref([])
const fileInput = ref(null)

function handleDrop(e) {
  files.value = [...files.value, ...Array.from(e.dataTransfer.files)]
}

function handleFileChange(e) {
  files.value = [...files.value, ...Array.from(e.target.files)]
}

function removeFile(index) {
  files.value.splice(index, 1)
}

function close() {
  emit('close')
}

function loadFiles() {
  emit('submit', files.value)
  files.value = []
  close()
}

function formatSize(bytes) {
  const kb = bytes / 1024
  return kb < 1024
      ? `${kb.toFixed(0)} KB`
      : `${(kb / 1024).toFixed(2)} MB`
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: #0c1f3acc;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal {
  background-color: #1e2e4a;
  padding: 2rem;
  border-radius: 14px;
  width: 480px;
  max-width: 95%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
  color: #ffffff;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: #ffffff;
}

.dropzone {
  border: 2px dashed #334155;
  border-radius: 12px;
  padding: 1.5rem;
  background-color: #0f1e30;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropzone:hover {
  background-color: #152c45;
}

.icon {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #f97316;
}

.drop-text {
  font-size: 0.95rem;
  font-weight: 500;
}

.format-hint {
  font-size: 0.75rem;
  color: #94a3b8;
}

.file-list {
  margin-top: 1.2rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.file-card {
  background-color: #253853;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
}

.file-icon {
  font-size: 1.5rem;
  color: #f87171;
  margin-right: 0.8rem;
}

.file-info {
  flex-grow: 1;
}

.file-name {
  font-size: 0.85rem;
  font-weight: 500;
}

.file-size {
  font-size: 0.75rem;
  color: #cbd5e1;
}

.remove-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 1rem;
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1.1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.load {
  background-color: #22c55e;
  color: white;
}

.btn.cancel {
  background-color: #ef4444;
  color: white;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
