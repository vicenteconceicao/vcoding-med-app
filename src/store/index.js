import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: false,
    user: null
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
    }
  },
  actions: {
    alterarDrawer({ commit }){
      commit('alterarDrawer')
    },
    setUser({ commit }, payload){
      commit('setUser', payload)
    }
  },
})