<template>
  <div class="navbar d-flex justify-content-between text-white bg-dark py-3 sticky-top">
    <div class="container">
      <router-link to="/">
        <div class="d-flex">
          <h4 class="mb-0">&#127829;</h4>
          <h4 class="mx-1 mb-0">¡Pizzería Mamma Mia!</h4>
        </div>
      </router-link>

      <router-link to="/carrito">
        <div>
          <h5 class="mb-0">&#128722; Total: ${{formatNumber(total)}}</h5>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import utils from "@/utils/functions";
const {formatNumber} = utils;

import { mapActions, mapGetters } from 'vuex';

export default {
  name: "Carrito",
  computed: {
    ...mapGetters(["carrito", "total"]), // "total" consume el total del carrito
  },
  methods: {
    ...mapActions(["plus", "minus"]),
    totalByPizza(cant, price) {
      return formatNumber(cant * price);
    },
    formatNumber,
  },
};
</script>

<style scoped>

</style>
