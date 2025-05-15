<template>
  <aside class="sidebar-supplier">
    <div class="logo-block">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="sidebar-logo" />
      <h3 class="sidebar-title">FuelTrack</h3>
    </div>

    <ul class="sidebar-menu">
      <li><router-link to="/supplier/admin" class="sidebar-link" active-class="active"><i class="ph ph-user"></i> Admin</router-link></li>
      <li><router-link to="/supplier/orders" class="sidebar-link" active-class="active"><i class="ph ph-clipboard-text"></i> Orders Management</router-link></li>
      <li><router-link to="/supplier/conciliations" class="sidebar-link" active-class="active"><i class="ph ph-file-check"></i> Conciliations</router-link></li>
      <li><router-link to="/supplier/dispatch" class="sidebar-link" active-class="active"><i class="ph ph-truck"></i> Dispatch</router-link></li>
      <li><router-link to="/supplier/analytics" class="sidebar-link" active-class="active"><i class="ph ph-chart-bar"></i> Analytics</router-link></li>
      <li><router-link to="/supplier/prices" class="sidebar-link" active-class="active"><i class="ph ph-currency-dollar"></i> Prices</router-link></li>
      <li><router-link to="/supplier/clients" class="sidebar-link" active-class="active"><i class="ph ph-headphones"></i> Clients</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarSupplier'
}
</script>

<style scoped>
.sidebar-supplier {
  background-color: #0A2C47;
  color: #ffffff;
  width: 240px;
  min-height: 100vh;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
  /* position: fixed;  <-- Eliminado */
}

.logo-block {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.sidebar-logo {
  height: 36px;
}

.sidebar-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  font-size: 0.92rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.3s ease;
  transform: translateX(0);
  position: relative;
  overflow: hidden;
}

.sidebar-link::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 4px;
  background-color: #22c55e;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.sidebar-link:hover {
  background-color: #1E3A5F;
  color: #ffffff;
  transform: translateX(6px);
}

.sidebar-link:hover::before {
  opacity: 1;
}

.sidebar-link i {
  font-size: 1.1rem;
}

.active {
  background-color: #22c55e !important;
  color: white !important;
  font-weight: 600;
  transform: translateX(8px);
}

.active::before {
  opacity: 1;
}
</style>
