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

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #0A2C47;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>
