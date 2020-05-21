import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    user: null,
    loading: false,
  },
  mutations: {
    alterarDrawer(state){
      state.drawer = !state.drawer
    },
    setToken(state, payload){
      state.token = payload
    },
    setUser(state, user){
      state.user = user
      if(user){
        axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      }else{
        delete axios.defaults.headers.common['Authorization']
      }
    },
    setLoading(state, payload){
      state.loading = payload
    }
  },
  actions: {
    alterarDrawer({ commit }){
      commit('alterarDrawer')
    },
    setUser({ commit }, payload){
      commit('setUser', payload)
    },
    setLoading({ commit }, payload){
      commit('setLoading', payload)
    }
  },
})