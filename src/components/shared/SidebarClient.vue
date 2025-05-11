<!-- src/components/shared/SidebarClient.vue -->
<template>
  <aside class="sidebar">
    <div class="logo-block">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="sidebar-logo" />
      <h3 class="sidebar-title">FuelTrack</h3>
    </div>

    <ul class="sidebar-menu">
      <li><router-link to="/client/admin" class="sidebar-link" active-class="active"><i class="fas fa-user"></i> Admin</router-link></li>
      <li><router-link to="/client/orders" class="sidebar-link" active-class="active"><i class="fas fa-file-alt"></i> Orders</router-link></li>
      <li><router-link to="/client/analytics" class="sidebar-link" active-class="active"><i class="fas fa-chart-pie"></i> Analytics</router-link></li>
      <li><router-link to="/client/terminals" class="sidebar-link" active-class="active"><i class="fas fa-gas-pump"></i> Terminals</router-link></li>
      <li><router-link to="/client/provider" class="sidebar-link" active-class="active"><i class="fas fa-briefcase"></i> Provider</router-link></li>
      <li><router-link to="/client/workflows" class="sidebar-link" active-class="active"><i class="fas fa-random"></i> Workflows</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarClient'
}
</script>

<style scoped src="../../assets/styles/pages/dashboardClient.css"></style>
