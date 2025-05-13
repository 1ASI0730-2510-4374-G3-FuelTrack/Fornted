<template>
  <div class="orders-container">
    <div class="orders-header">
      <div class="header-content">
        <div class="header-title">
          <h2>Order Management</h2>
          <span class="breadcrumb">Home / Order Management</span>
        </div>
        <div class="header-second">
          <p class="subheader">Manage your customers' orders</p>
          <div class="stats-cards">
            <div class="stat-card">
              <div class="stat-value">0</div>
              <div class="stat-label">Total Orders</div>
            </div>
            <div class="divider"></div>
            <div class="stat-card">
              <div class="stat-value">{{ approvedCount }}</div>
              <div class="stat-label">Approved</div>
            </div>
            <div class="divider"></div>
            <div class="stat-card">
              <div class="stat-value">{{ requestedCount }}</div>
              <div class="stat-label">Requested</div>
            </div>
          </div>
        </div>

      </div>

      <div class="header-actions">
        <div class="status-filters">
          <button
              v-for="(filter, key) in statusFilters"
              :key="key"
              @click="toggleFilter(key)"
              class="status-btn"
              :class="{ 'active-status': activeFilter === key }"
          >
            <span class="filter-label">{{ filter.label }}</span>
            <span class="filter-count">{{ filter.count }}</span>
          </button>
        </div>
        <div class="action-buttons">
          <button class="action-btn"><i class="fas fa-filter"></i> Filters</button>
          <button class="action-btn"><i class="fas fa-calendar-alt"></i> Date Range</button>
        </div>
      </div>
    </div>

    <table class="orders-table">
      <thead>
      <tr>
        <th></th>
        <th>Created</th>
        <th>Customer</th>
        <th>Amount</th>
        <th>Terminal</th>
        <th>Order ID</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(order, index) in paginatedOrders" :key="order.id">
        <td>
          <button class="expand-btn" @click="toggleExpand(index)">
            {{ expandedRow === index ? '▼' : '▶' }}
          </button>
        </td>
        <td>{{ order.created }}</td>
        <td>{{ order.user }}</td>
        <td>{{ order.amount }}</td>
        <td>{{ order.terminal }}</td>
        <td>
          <div class="order-id-cell">
            <i class="fas fa-copy"></i> {{ order.orderId }}
          </div>
        </td>
        <td>
            <span :class="'badge ' + order.status.toLowerCase()">
              {{ order.status }}
            </span>
        </td>
      </tr>

      <!-- Expanded row for products -->
      <tr v-if="expandedRow === index" class="order-details-row">
        <td colspan="7">
          <table class="product-details">
            <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Total Amount</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(product, i) in order.products" :key="i">
              <td>{{ product.product }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.unit }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.total }}</td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="pagination">
      <div class="items-per-page">
        <label>Items per page:
          <select v-model="itemsPerPage">
            <option>5</option>
            <option>10</option>
            <option>13</option>
            <option>25</option>
          </select>
        </label>
        <span>{{ pageStart }} - {{ pageEnd }} of {{ orders.length }} items</span>
      </div>
      <div class="page-controls">
        <span>01 of 15 pages</span>
        <button @click="prevPage" :disabled="page === 1" class="page-btn">‹</button>
        <button @click="nextPage" :disabled="pageEnd >= orders.length" class="page-btn">›</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Button from 'primevue/button';
import Badge from 'primevue/badge';

export default {
  components: {
    Button,
    Badge
  },
  name: 'SupplierOrders',
  data() {
    return {
      orders: [],
      page: 1,
      itemsPerPage: 13,
      expandedRow: null,
      filters: {
        important: false,
        approved: false,
        returned: false,
        dispatched: false,
        closed: false
      },
      statusFilters: {
        requested: { label: 'Requested', count: '2.58K' },
        approved: { label: 'Approved', count: '607.78K' },
        released: { label: 'Released', count: '48' },
        dispatched: { label: 'Dispatched', count: '12' },
        closed: { label: 'Closed', count: '1.56K' }
      },
      appliedFilters: {
        requested: 'Requested',
        approved: 'Approved',
        released: 'Released',
        dispatched: 'Dispatched',
        closed: 'Closed',
      },
      activeFilter: null,
    }
  },
  computed: {
    paginatedOrders() {
      const start = (this.page - 1) * this.itemsPerPage
      return this.orders.slice(start, start + parseInt(this.itemsPerPage))
    },
    pageStart() {
      return (this.page - 1) * this.itemsPerPage + 1
    },
    pageEnd() {
      const end = this.page * this.itemsPerPage
      return end > this.orders.length ? this.orders.length : end
    },
    approvedCount() {
      return this.orders.filter(o => o.status.toLowerCase() === 'approved').length
    },
    requestedCount() {
      return this.orders.filter(o => o.status.toLowerCase() === 'requested').length
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await axios.get('http://localhost:3001/supplierorders')
        this.orders = res.data
      } catch (err) {
        console.error('Error fetching orders:', err)
      }
    },
    nextPage() {
      if (this.pageEnd < this.orders.length) this.page++
    },
    prevPage() {
      if (this.page > 1) this.page--
    },
    toggleExpand(index) {
      this.expandedRow = this.expandedRow === index ? null : index
    },
    toggleFilter(key) {
      this.activeFilter = this.activeFilter === key ? null : key;
    }
  },
  mounted() {
    this.fetchOrders()
  }
}
</script>

<style scoped src="@/assets/styles/pages/supplierOrders.css"></style>
