import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // =  data
    products: [],
    cart: []
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
    },
    addProductToTheCart (context, product) {
      if(product.inventory > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if(!cartItem) {
          // Add to the cart
          context.commit('pushProductToCart', product.id)
        } else {
          // Increase the cartItem Count
          context.commit('increaseItemQuantity', cartItem)
        }
        context.commit('decrementProductInventory', product)
      }
    }

  },
  mutations: { // It is responsible for setting and updating the state

    setProducts(state, prods) {
      state.products = prods
    },
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    increaseItemQuantity (state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})
