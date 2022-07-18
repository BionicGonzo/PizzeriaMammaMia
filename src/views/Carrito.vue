<template>
  <div class="carrito p-5">
    <div class="detalles w-100 m-auto p-3">
      <h5>Detalles del pedido:</h5>
      <div class="p-3 list">
        <div v-for="(pizza, i) in carrito" :key="i"> <!-- recorre el getter carrito -->
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img width="50" :src="pizza.img"/>
              <h6 class="mb-0 text-capitalize p-2">{{pizza.name}}</h6>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <!-- No basta el formatNumber, precio debe considerar también total de cantidad de pizzas, se crea método totalByPizza -->
              <h6 class="mb-0 p-2 text-success">
                ${{totalByPizza(pizza.cant, pizza.price)}} <!-- multiplicación de cantidad por precio, se utiliza método totalByPizza -->
              </h6>
              <button class="btn btn-outline-dark" @click="minus(pizza.id)">-</button>
              <b class="mx-2">{{pizza.cant}}</b> <!-- indica la cantidad real de pizzas que se están llevando de una en específico, siendo afectada por botón - y/o + -->
              <button class="btn btn-outline-danger" @click="plus(pizza.id)">+</button>
            </div>
          </div>
          <hr class="mt-2"/>
        </div>

        <h2>Total: ${{formatNumber(total)}}</h2>
        <router-link to="/end">
          <button id="irPagar" class="btn btn-outline-success">Ir a Pagar</button>
        </router-link> 
        <router-link to="/">
          <button class="btn btn-outline-dark mx-3">Volver a Inicio</button>
        </router-link>
      </div>
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
.list {
  background: white;
}
</style>
