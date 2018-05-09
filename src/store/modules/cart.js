export default {

  state: {
    cartItems: [],
    checkoutStatus: null
  },

  getters: {
    cartProducts (state, getters, rootState) {
      return state.cartItems.map(cartItem => {
        const prod = rootState.products.productItems.find(product => product.id === cartItem.id)
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

  mutations: {
    pushProductToCart (state, productId) {
      state.cartItems.push({
        id: productId,
        quantity: 1
      })
    },

    increaseItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state) {
      state.cartItems = []
    }
  },

  actions: {

    addProductToTheCart (context, product) {
      if(context.getters.productsIsInStock(product)) {
        const cartItem = context.state.cartItems.find(item => item.id === product.id)
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
        state.cartItems,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus','success')
        },
        () => {
          commit('setCheckoutStatus','notSuccess')
        }
      )

    }
  }

}
