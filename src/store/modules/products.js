import shop from '@/api/shop'

export default {
  state: {
    productItems: []
  },
  mutations: {

    setProducts(state, prods) {
      state.productItems = prods
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }

  },
  getters: {

    availableProducts (state, getters) {
      return state.productItems.filter(prod => prod.inventory > 0)
    },

    productsIsInStock () {
      return (prod) => {
          return prod.inventory > 0
      }
    }

  },

  actions: {

    fetchProducts ({commit}) {
      return new Promise((resolve, reject) => {
        shop.getProducts(prods => {
          commit('setProducts', prods)
          resolve()
        })
      })
    }

  }
}
