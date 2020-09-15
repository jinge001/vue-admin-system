import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import userinfo from './modules/userinfo'

import getters from './getters'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    permission,
    userinfo,
  },
  getters
})

export default store
