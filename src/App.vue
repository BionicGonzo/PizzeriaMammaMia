<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { mapActions } from "vuex";
export default {
  name: "App",
  components:{
    Navbar,
    Footer
  },
  methods: {
    ...mapActions(["get_Pizzas"]) // tiene que coincidir con la acción creada en index.js
  },
  mounted() {
    this.get_Pizzas()
  }
};
</script>

<style>
body {
  font-family: 'Cabin', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Lobster', sans-serif;
}

a,
a:hover {
  text-decoration: none;
  color: white;
}

ul {
  list-style: none;
}
</style>
