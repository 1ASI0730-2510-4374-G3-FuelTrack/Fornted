<template>
  <div class="orders-container">
    <div class="orders-header">
      <div>
        <h2>Orders</h2>
        <p>Quick view of your fuel orders</p>
        <button class="create-order-btn">+ Create Order</button>
      </div>

      <div class="orders-actions">
        <div class="stats">
          <div>
            <h3>{{ orders.length }}</h3>
            <p>Total Orders</p>
          </div>
          <div>
            <h3>{{ approvedCount }}</h3>
            <p>Approved</p>
          </div>
          <div>
            <h3>{{ requestedCount }}</h3>
            <p>Requested</p>
          </div>
        </div>

        <div class="filter-controls">
          <button><i class="fas fa-filter"></i> Filters</button>
          <button><i class="fas fa-calendar-alt"></i> Date Range</button>
        </div>
      </div>
    </div>

    <table class="orders-table">
      <thead>
      <tr>
        <th></th>
        <th>Created</th>
        <th>User</th>
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
        <td><i class="fas fa-copy"></i> {{ order.orderId }}</td>
        <td>
            <span :class="'badge ' + order.status.toLowerCase()">
              {{ order.status }}
            </span>
        </td>
      </tr>

      <!-- Fila expandida para productos -->
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
      <label>Items per page:
        <select v-model="itemsPerPage">
          <option>5</option>
          <option>10</option>
          <option>13</option>
          <option>25</option>
        </select>
      </label>
      <span>{{ pageStart }} - {{ pageEnd }} of {{ orders.length }} items</span>
      <button @click="prevPage" :disabled="page === 1">‹</button>
      <button @click="nextPage" :disabled="pageEnd >= orders.length">›</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OrdersList',
  data() {
    return {
      orders: [],
      page: 1,
      itemsPerPage: 13,
      expandedRow: null
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
        const res = await axios.get('http://localhost:3001/orders')
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
    }
  },
  mounted() {
    this.fetchOrders()
  }
}
</script>

<style scoped src="@/assets/styles/pages/ordersList.css"></style>
