<template>
  <div>
    <nuxt-link v-if="!GET_PLAYER" to="/login">
      LOGIN
    </nuxt-link>
    {{ GET_PLAYER }}
    <Tutorial v-if="GET_PLAYER" />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    GET_PLAYER () {
      return this.$store.state.auth.player
    }
  }
}
</script>
