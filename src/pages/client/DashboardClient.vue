<template>
  <div class="dashboard-container">
    <SidebarClient />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import SidebarClient from '@/components/shared/SidebarClient.vue'

export default {
  name: 'DashboardClient',
  components: {
    SidebarClient
  }
}
</script>

<style scoped src="../../assets/styles/pages/dashboardClient.css"></style>
