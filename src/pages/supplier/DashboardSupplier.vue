<template>
  <div class="dashboard-container">
    <SidebarSupplier />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import SidebarSupplier from "@/components/shared/SidebarSupplier.vue";

export default {
  name: 'DashboardSupplier',
  components: {
    SidebarSupplier
  }
}
</script>

<style scoped src="../../assets/styles/pages/dashboardSupplier.css"></style>
