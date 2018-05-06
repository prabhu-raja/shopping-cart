<template>
  <div>
    <h1>Product List</h1>
    <img
      src="https://i.imgur.com/JfPpwOA.gif"
      v-if="loading">
    <ul v-else>
      <li v-for="(product, pIndx) in products" :key="pIndx">
        {{product.title}} - {{product.price}} - {{product.inventory}}
        <button @click="addProductToCart(product)">
          Add to Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    products () {
      return this.$store.getters.availableProducts
    }
  },
  methods: {
    addProductToCart (product) {
      this.$store.dispatch('addProductToTheCart', product)
    }
  },
  created () {
    this.loading = true
    this.$store.dispatch('fetchProducts')
      .then(() => {
        this.loading = false
      })
  }
}
</script>
