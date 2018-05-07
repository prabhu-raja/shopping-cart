import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // =  data
    products: [],
    cart: [],
    checkoutStatus: null
  },
  getters: { // = computed
    availableProducts (state, getters) {
      return state.products.filter(prod => prod.inventory > 0)
    },
    cartProducts (state) {
      return state.cart.map(cartItem => {
        const prod = state.products.find(product => product.id === cartItem.id)
        return {
          title: prod.title,
          price: prod.price,
          quantity: cartItem.quantity
        }
      })
    },
    cartTotal (state, getters) {
      let total = 0
      /*
      getters.cartProducts.forEach(prod => {
        total += prod.price * prod.quantity
      });
      return total
      */
     return getters.cartProducts.reduce((total, prod) => total + prod.price * prod.quantity, 0)
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
    },
    checkout ({state, commit}) {
      shop.buyProducts(
        state.cart,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus','success')
        },
        () => {
          commit('setCheckoutStatus','notSuccess')
        }
      )

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
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },
    emptyCart (state) {
      state.cart = []
    }
  }
})
