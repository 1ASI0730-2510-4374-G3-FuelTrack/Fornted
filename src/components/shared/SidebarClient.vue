<!-- src/components/shared/SidebarClient.vue -->
<template>
  <aside class="sidebar">
    <div class="logo-block">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="sidebar-logo" />
      <h3 class="sidebar-title">FuelTrack</h3>
    </div>

    <ul class="sidebar-menu">
      <li><router-link to="/client/admin" class="sidebar-link" active-class="active"><i class="fas fa-user"></i> {{ $t('sidebar.client.admin') }}</router-link></li>
      <li><router-link to="/client/orders" class="sidebar-link" active-class="active"><i class="fas fa-file-alt"></i> {{ $t('sidebar.client.orders') }}</router-link></li>
      <li><router-link to="/client/analytics" class="sidebar-link" active-class="active"><i class="fas fa-chart-pie"></i> {{ $t('sidebar.client.analytics') }}</router-link></li>
      <li><router-link to="/client/terminals" class="sidebar-link" active-class="active"><i class="fas fa-gas-pump"></i> {{ $t('sidebar.client.terminals') }}</router-link></li>
      <li><router-link to="/client/provider" class="sidebar-link" active-class="active"><i class="fas fa-briefcase"></i> {{ $t('sidebar.client.provider') }}</router-link></li>
      <li><router-link to="/client/workflows" class="sidebar-link" active-class="active"><i class="fas fa-random"></i> {{ $t('sidebar.client.workflows') }}</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarClient'
}
</script>

<style scoped src="../../assets/styles/pages/dashboardClient.css"></style>
