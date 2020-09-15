import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    async updateInfo ({ commit, dispatch, getters }, data) {
      try {
        const uid = await dispatch('getUserId')
        const updatedInfo = { ...getters.info, ...data }
        await firebase.database().ref(`/users/${uid}/info`).update(updatedInfo)
        commit('setInfo', updatedInfo)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async loadInfo ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUserId')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {

      }
    }
  },
  getters: {
    info: i => i.info
  }
}
