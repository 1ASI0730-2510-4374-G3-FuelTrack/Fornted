<template>
  <div class="login-container">
    <div class="login-card">
      <img src="/img/logo.png" alt="FuelTrack Logo" class="logo" />
      <h1 class="title">FuelTrack</h1>
      <p class="subtitle">{{ $t('login.supplier.subtitle') }}</p>

      <form @submit.prevent="fakeLogin">
        <input
            type="text"
            v-model="ruc"
            :placeholder="$t('common.ruc')"
            required
            aria-label="RUC"
        />

        <input
            type="email"
            v-model="email"
            :placeholder="$t('common.email')"
            required
            aria-label="Email Address"
        />

        <input
            type="password"
            v-model="password"
            :placeholder="$t('common.password')"
            required
            aria-label="Password"
        />

        <button type="submit" class="login-button">{{ $t('login.supplier.submit') }}</button>
      </form>

      <p class="register-text">
        {{ $t('login.supplier.not_supplier') }} <router-link to="/register-supplier" class="register-link">{{ $t('common.click_here') }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
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
      alert(this.$t('login.demo_supplier'))
      this.$router.push('/supplier') // Asegúrate que esta ruta exista
    }
  }
}
</script>

<style scoped src="../../assets/styles/pages/loginClient.css"></style>
