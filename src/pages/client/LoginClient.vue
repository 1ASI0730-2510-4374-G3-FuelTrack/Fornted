<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
      <h1 class="title">FuelTrack</h1>
      <p class="subtitle">Optimize your fuel orders management</p>

      <form @submit.prevent="handleLogin">
        <label for="email" class="visually-hidden">Email Address</label>
        <input type="email" v-model="email" placeholder="Email Address" required />

        <label for="password" class="visually-hidden">Password</label>
        <input type="password" v-model="password" placeholder="Password" required />

        <button type="submit" class="login-button">Log in</button>
      </form>

      <p class="register-text">
        Not a Client? <a href="#" class="register-link">Click Here</a>
      </p>
    </div>
  </div>
</template>

<script>
import { loginClient } from '@/services/authService'

export default {
  name: 'LoginClient',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      const result = await loginClient(this.email, this.password)

      if (result.success) {
        alert('✅ Login exitoso')
        // Aquí puedes redirigir a su dashboard, ejemplo:
        this.$router.push('/client/orders')

      } else {
        alert('❌ ' + result.message)
      }
    }
  }
}
</script>

<style scoped src="../../assets/styles/pages/loginClient.css"></style>
