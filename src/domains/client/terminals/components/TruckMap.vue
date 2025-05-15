<template>
  <div id="map" class="truck-map"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-ant-path' // importar el plugin
import { getTrucks } from '../services/terminalService.js'

const trucks = ref([])

onMounted(async () => {
  trucks.value = await getTrucks()

  const map = L.map('map').setView([-12.0464, -77.0428], 10)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  trucks.value.forEach(truck => {
    // Coordenadas de ejemplo para simular trayecto desde una terminal
    const origin = truck.originCoords || [-12.0611, -77.1188] // Default Callao

    const route = [origin, [truck.lat, truck.lng]]

    // Línea animada
    L.polyline.antPath(route, {
      delay: 800,
      dashArray: [10, 20],
      weight: 4,
      color: '#0ea5e9',
      pulseColor: '#38bdf8'
    }).addTo(map)

    // Marcador
    const marker = L.marker([truck.lat, truck.lng]).addTo(map)
    marker.bindPopup(`
      <strong>${truck.driver}</strong><br/>
      ${truck.plate}<br/>
      ${truck.fuel} - ${truck.quantity} gal<br/>
      Estado: ${truck.status}
    `)
  })
})
</script>

<style scoped>
.truck-map {
  height: 420px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}
</style>
