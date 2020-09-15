import firebase from 'firebase/app'

export default {
  actions: {
    async createOperation ({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUserId')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
