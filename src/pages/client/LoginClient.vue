<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
      <h1 class="title">FuelTrack</h1>
      <p class="subtitle">Optimize your fuel orders management</p>

      <!-- Simulación de formulario -->
      <form @submit.prevent="fakeLogin">
        <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Email Address"
            required
        />
        <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Password"
            required
        />
        <button type="submit" class="login-button">Enter as Client</button>
      </form>

      <p class="register-text">
        Not a Client?
        <a href="#" class="register-link">Click Here</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginClient',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    fakeLogin() {
      alert('✅ Logged in as demo client')
      this.$router.push('/client/orders')
    }
  }
}
</script>

<style scoped src="@/assets/styles/pages/loginClient.css"></style>
