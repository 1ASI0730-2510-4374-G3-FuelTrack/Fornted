<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
      <h1 class="title">FuelTrack</h1>
      <p class="subtitle">Supplier Access Portal</p>

      <form @submit.prevent="handleLogin">
        <label for="ruc" class="visually-hidden">RUC</label>
        <input type="text" v-model="ruc" placeholder="RUC" required />

        <label for="email" class="visually-hidden">Email Address</label>
        <input type="email" v-model="email" placeholder="Email Address" required />

        <label for="password" class="visually-hidden">Password</label>
        <input type="password" v-model="password" placeholder="Password" required />

        <button type="submit" class="login-button">Log in</button>
      </form>

      <p class="register-text">
        Not a Supplier? <a href="#" class="register-link">Click Here</a>
      </p>
    </div>
  </div>
</template>

<script>
import { loginSupplier } from '@/services/authService.js'

export default {
  name: 'LoginSupplier',
  data() {
    return {
      ruc: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      const result = await loginSupplier(this.ruc, this.email, this.password)

      if (result.success) {
        alert('✅ Login exitoso como proveedor')
        // Redireccionar si se requiere, ej: this.$router.push('/supplier/dashboard')
      } else {
        alert('❌ ' + result.message)
      }
    }
  }
}
</script>

<style scoped src="../../assets/styles/pages/loginClient.css"></style>
