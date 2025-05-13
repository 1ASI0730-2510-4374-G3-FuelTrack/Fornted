<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
      <h1 class="title">FuelTrack</h1>
      <p class="subtitle">Supplier Access Portal</p>

      <form @submit.prevent="handleLogin">
        <input
            type="text"
            v-model="ruc"
            placeholder="RUC"
            required
            aria-label="RUC"
        />

        <input
            type="email"
            v-model="email"
            placeholder="Email Address"
            required
            aria-label="Email Address"
        />

        <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
            aria-label="Password"
        />

        <button type="submit" class="login-button">Log in</button>
      </form>

      <p class="register-text">
        Not a Supplier? <router-link to="/register-supplier" class="register-link">Click here</router-link>
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
        this.$router.push('/supplier') // ← cambia la ruta según tu layout
      } else {
        alert('❌ ' + result.message)
      }
    }
  }
}
</script>

<style scoped src="../../assets/styles/pages/loginClient.css"></style>
