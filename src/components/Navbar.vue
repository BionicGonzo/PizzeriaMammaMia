<template>
  <div class="navbar d-flex justify-content-between text-white bg-dark py-3">
    <div class="container">
      <router-link to="/">
        <div class="d-flex">
          <h4 class="mb-0">&#127829;</h4>
          <h4 class="mx-1 mb-0">¡Pizzería Mamma Mia!</h4>
        </div>
      </router-link>

      <router-link to="/carrito">
        <div>
          <h5 class="mb-0">Ir al carrito &#128722;</h5>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>

</style>
