<template>
  <div class="card w-100">
    <img class="card-img-top" :src="pizza.img"/> <!-- sustituir las imágenes dinámicamente -->
    <div class="card-body">
      <h4 class="card-title text-capitalize">{{pizza.name}}</h4> <!-- sustituir el nombre dinámicamente -->
      <hr />
      <p class="card-text">
        <b>Ingredientes:</b>
      </p>
      <ul class="m-0">
        <li class="text-capitalize w-75" v-for="(ingrediente, i) in pizza.ingredients" :key="i">&#127829; {{ingrediente}}</li> <!-- recorre el arreglo para sustituir los ingredientes -->
      </ul>
    </div>
    <hr />
    <div class="card-body">
      <h2 class="text-center text-dark pb-3">${{formatNumber(pizza.price)}}</h2> <!-- sustituir el precio dinámicamente, se da formato con utils/functions y se llama abajo -->
      <div class="d-flex justify-content-around">
        <!-- con interpolación se coloca la id para que al hacer click en "Ver Más" la url se reemplace dinámicamente dependiendo del ID de la pizza -->
        <router-link :to="`/pizza/${pizza.id}`"
          ><button class="btn btn-outline-dark">
            Ver Más &#128064;
          </button>
        </router-link>
        <button class="btn btn-outline-danger" @click="addToCart(pizza.id)"> <!-- llamada a acción para añadir pizza a carrito -->
          ¡La quiero! &#128722;
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/functions";
import { mapActions } from "vuex";
const {formatNumber} = utils; // destructuring para ocupar el método formatNumber
export default {
  name: "Card",
  props: ["pizza"],
  methods: {
    formatNumber,
    ...mapActions(["addToCart"]),
  }
};
</script>

<style scoped>
.card {
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>