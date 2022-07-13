<template>
  <div class="home">
    <Header />
    <div class="container">
      <div class="row py-5 pizzas">
        <div class="col-12 col-sm-3 mb-4 pizza" v-for="(pizza, i) in pizzas" :key="i">
          <Card :pizza="pizza"/> <!-- se recorre el [] de manera dinámica y se está renderizando cada iteración con los componentes de cada pizza -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Card from "@/components/Card.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Header,
    Card,
  },
  computed: { // valor reactivo
    ...mapState(["pizzas"]),
  }
};
</script>
