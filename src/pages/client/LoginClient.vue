<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
      <h1 class="title">FuelTrack</h1>
      <p class="subtitle">{{ $t('login.client.subtitle') }}</p>

      <!-- Simulación de formulario -->
      <form @submit.prevent="fakeLogin">
        <input
            id="email"
            type="email"
            v-model="email"
            :placeholder="$t('common.email')"
            required
        />
        <input
            id="password"
            type="password"
            v-model="password"
            :placeholder="$t('common.password')"
            required
        />
        <button type="submit" class="login-button">{{ $t('login.client.submit') }}</button>
      </form>

      <p class="register-text">
        {{ $t('login.client.not_client') }}
        <a href="#" class="register-link">{{ $t('common.click_here') }}</a>
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
      alert(this.$t('login.demo_client'))
      this.$router.push('/client/orders')
    }
  }
}
</script>

<style scoped src="@/assets/styles/pages/loginClient.css"></style>
