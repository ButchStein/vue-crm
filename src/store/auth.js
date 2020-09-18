import firebase from 'firebase/app'
export default {
  actions: {
    async login ({ commit, dispatch }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async registration ({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const id = await dispatch('getUserId')
        await firebase.database().ref(`/users/${id}/info`).set({
          billing: 10000,
          bankScore: 0,
          cashScore: 0,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUserId () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
