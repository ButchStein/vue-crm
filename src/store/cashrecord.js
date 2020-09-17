import firebase from 'firebase/app'

export default {
  actions: {
    async createCashOperation ({ commit, dispatch }, record) {
      try {
        const uid = await dispatch('getUserId')
        return await firebase.database().ref(`/users/${uid}/cashrecords`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCashRecords ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUserId')
        const operations = (await firebase.database().ref(`/users/${uid}/cashrecords`).once('value')).val() || {}
        return Object.keys(operations).map(key => ({ ...operations[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
