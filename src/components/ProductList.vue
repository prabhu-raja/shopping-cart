<template>
  <div>
    <h1>Product List</h1>
    <img
      src="https://i.imgur.com/JfPpwOA.gif"
      v-if="loading">
    <ul v-else>
      <li v-for="(product, pIndx) in products" :key="pIndx">
        {{product.title}} - {{product.price}}
      </li>
    </ul>
  </div>
</template>

<script>

import store from '@/store/index'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    products () {
      // return store.state.products
      return store.getters.availableProducts
    }
  },
  created () {
    this.loading = true
    store.dispatch('fetchProducts')
      .then(() => {
        this.loading = false
      })
    /*
    shop.getProducts(prods => {
      // You should never update the state directly, without calling amutation
      // store.state.products = prods
      store.commit('setProducts', prods)
    })
    */
  }
}
</script>
