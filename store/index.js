export const state = () => ({
  auth: {
    player: null
  }
})

export const getters = {
  GET_PLAYER: state => state.auth.player
}

export const mutations = {
  SET_PLAYER (state, payload) { state.auth.player = payload }
}

export const actions = {
  async nuxtServerInit ({ dispatch }, { req, res }) {
    console.log(req.headers)
    const token = this.$cookies.get('token')

    if (token) {
      this.$axios.setToken(token, 'Bearer')

      // FETCH_PLAYER udates auth.player
      // auth.player is usable only on Server Side
      await dispatch('FETCH_PLAYER')
    }
  },

  async FETCH_PLAYER ({ state, commit }) {
    const response = await this.$axios.$get('https://dummyjson.com/users/1')
    commit('SET_PLAYER', response)
    this.$router.push('/')

    // SERVER SIDE
    // On Duplicate Tab Terminal consoles the populated auth.player value

    // CLIENT SIDE
    // auth.player is null
    console.log(state.auth)
  },

  async SIGNIN ({ dispatch }, data) {
    const { token } = await this.$axios.$post('https://dummyjson.com/auth/login', data)
    this.$cookies.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })
    this.$axios.setToken(token, 'Bearer')

    // FETCH_PLAYER updates auth.player
    // auth.player is usable on both sides (Server & Client)
    dispatch('FETCH_PLAYER')
  }
}

// Steps to Reproduce

// First Scenario
// Step 1 -> Remove token from Browser Cookies
// Step 2 -> Close and re-open Browser
// Step 3 -> Go to /login & perform SignIn
// Step 4 -> Duplicate Tab
// Step 6 -> On Server Side store.state.auth.player is populated (Terminal)
// Step 7 -> On Client Side store.state.auth.player is null (VueDevtools)
