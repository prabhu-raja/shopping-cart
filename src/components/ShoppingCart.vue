<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="(product, pIndex) in products" :key="pIndex">
        {{product.title}} - {{product.price | currency}} - {{product.quantity}}
      </li>
    </ul>
    <p>Total: {{total | currency}}</p>
    <!-- <button @click="$store.dispatch('checkout')">Checkout</button> -->
    <button @click="checkout">Checkout</button>
    <p v-if="statusCheckout">{{statusCheckout}}</p>
  </div>
</template>

<script>
import {  mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    }),
    ...mapState({
      statusCheckout: state => state.checkoutStatus
    })
    /*
    products () {
      return this.$store.getters.cartProducts
    },
    total () {
      return this.$store.getters.cartTotal
    }
    */
  },
  methods: {
    ...mapActions(['checkout'])
  }
}
</script>
