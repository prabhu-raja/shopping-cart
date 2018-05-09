<template>
  <div>
    <h1>Product List</h1>
    <img
      src="https://i.imgur.com/JfPpwOA.gif"
      v-if="loading">
    <ul v-else>
      <li v-for="(product, pIndx) in products" :key="pIndx">
        {{product.title}} - {{product.price | currency}} - {{product.inventory}}
        <button
          :disabled="!isProductInStock(product)"
          @click="addProductToCart(product)">
            Add to Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.productItems
    }),
    ...mapGetters('products', {
      isProductInStock: 'productsIsInStock'
    })
  },
  /*
  computed: {
    products () {
      // return this.$store.getters.availableProducts
      return this.$store.state.products
    },
    isProductInStock () {
      return this.$store.getters.productsIsInStock
    }
  },
  */
  methods: {
    ...mapActions({
      getProducts: 'products/fetchProducts',
      addProductToCart: 'cart/addProductToTheCart'
    })
    // addProductToCart (product) {
    //   this.$store.dispatch('addProductToTheCart', product)
    // }
  },
  created () {
    this.loading = true
    this.getProducts()
      .then(() => {
        this.loading = false
      })
    // this.$store.dispatch('fetchProducts')
    //   .then(() => {
    //     this.loading = false
    //   })
  }
}
</script>
