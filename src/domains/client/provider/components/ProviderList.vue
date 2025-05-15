<template>
  <div class="provider-list">
    <ProviderRatingCard
        v-for="provider in providers"
        :key="provider.ruc"
        :provider="provider"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProviders } from '../services/providerService.js'
import ProviderRatingCard from './ProviderRatingCard.vue'

const providers = ref([])

onMounted(async () => {
  providers.value = await getProviders()
})
</script>

<style scoped>
.provider-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
</style>
