<template>
  <div class="login-page">
    <h1> LOGIN </h1>

    <form class="form" @submit.prevent="submit">
      <pre>
        {{ user }}
      </pre>
      <div class="form-group">
        <label class="form-label"> Username </label>
        <input v-model="user.username" type="text">
      </div>
      <div class="form-group">
        <label class="form-label"> Password </label>
        <input v-model="user.password" type="text">
      </div>

      <button type="submit">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    user: {
      username: 'kminchelle',
      password: '0lelplR'
    }
  }),
  methods: {
    submit () {
      this.$store.dispatch('SIGNIN', this.user)
    }
  }
}
</script>
