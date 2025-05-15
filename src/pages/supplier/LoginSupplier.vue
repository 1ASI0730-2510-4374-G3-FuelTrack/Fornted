<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
      <h1 class="title">FuelTrack</h1>
      <p class="subtitle">Supplier Access Portal</p>

      <form @submit.prevent="fakeLogin">
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

        <button type="submit" class="login-button">Enter as Supplier</button>
      </form>

      <p class="register-text">
        Not a Supplier? <router-link to="/register-supplier" class="register-link">Click here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import '@/assets/styles/pages/LoginClient.css'
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
    fakeLogin() {
      alert('✅ Logged in as demo supplier')
      this.$router.push('/supplier') // Asegúrate que esta ruta exista
    }
  }
}
</script>

<style scoped src="../../assets/styles/pages/LoginClient.css"></style>
