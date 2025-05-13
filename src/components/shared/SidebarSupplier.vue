<!-- src/components/shared/SidebarClient.vue -->
<template>
  <aside class="sidebar">
    <div class="logo-block">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="sidebar-logo" />
      <h3 class="sidebar-title">FuelTrack</h3>
    </div>

    <ul class="sidebar-menu">
      <li><router-link to="/supplier/admin" class="sidebar-link" active-class="active"><i class="fas fa-user"></i> Admin</router-link></li>
      <li><router-link to="/supplier/orders-management" class="sidebar-link" active-class="active"><i class="fas fa-file-alt"></i> Orders management</router-link></li>
      <li><router-link to="/supplier/conciliations" class="sidebar-link" active-class="active"><i class="fas fa-chart-pie"></i> Conciliations</router-link></li>
      <li><router-link to="/supplier/dispatch" class="sidebar-link" active-class="active"><i class="fas fa-gas-pump"></i> Dispatch</router-link></li>
      <li><router-link to="/supplier/analytics" class="sidebar-link" active-class="active"><i class="fas fa-briefcase"></i> Analytics</router-link></li>
      <li><router-link to="/supplier/prices" class="sidebar-link" active-class="active"><i class="fas fa-random"></i> Prices</router-link></li>
      <li><router-link to="/supplier/client-list" class="sidebar-link" active-class="active"><i class="fas fa-random"></i> Clients</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarSupplier'
}
</script>

<style scoped src="../../assets/styles/pages/dashboardSupplier.css"></style>
