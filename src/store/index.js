import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'
import { resolve } from 'upath';

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // =  data
    products: []
  },
  getters: { // = computed
    availableProducts (state, getters) {
      return state.products.filter(prod => prod.inventory > 0)
    }
  },
  actions: { //= methods

    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(prods => {
          commit('setProducts', prods)
          resolve()
        })
      })
    }

  },
  mutations: {
    // It is responsible for setting and updating the state
    setProducts(state, prods) {
      state.products = prods
    }
  }
})
