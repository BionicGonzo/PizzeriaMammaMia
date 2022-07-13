import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pizzas: [], // arreglo vacío para que al leer el código sepa de qué tipo de dato se va a tratar este atributo
    carrito: [],
  },
  mutations: {
    GET_PIZZAS(state, pizzas) { // segundo parámetro es el payload correspondiente al commit
      state.pizzas = pizzas; // en el estado global, el atributo "pizzas" va a ser igual al parámetro "pizzas" que se recibe en la mutación
    },
    ADD_TO_CART(state, pizza) {
      state.carrito.push(pizza);
    },
    UPDATE_CART(state, carrito) {
      state.carrito = carrito; // reasignar el valor del atributo carrito, considerando que este nuevo carrito tiene incluido la modificación del producto que fue incrementado, se ejecuta al hacer click al botón con signo +
    },
  },
  actions: {
    async get_Pizzas({commit}) {
      const { data: pizzas } = await axios.get("/pizzas.json"); // llamando al archivo .json dentro de la carpeta public, se extrae atributo data, con nombre personalizado "pizzas"
      commit("GET_PIZZAS", pizzas); // se ejecuta commit para pasar el arreglo de objetos
    },

    addToCart({commit, dispatch, state}, pizzaId) { // destructuración del contexto para usar método commit, segundo parámetro es el id de la pizza, que se pasa como argumento desde la Card
      // const pizza = {id: pizzaId, cant: 1}; // crear objeto con 2 atributos: id y cantidad, por defecto 1
      // commit("ADD_TO_CART", pizza); // se ejecuta la mutación ADD_TO_CART, y se pasa como payload la pizza que se crea en la acción
      // alert("¡Pizza añadida al carrito!"); // se notifica al usuario

      /* LÓGICA PARA QUE EL BOTÓN AÑADIR NO CREE NUEVOS OBJETOS EN EL CARRITO, SINO QUE SUME CANTIDAD AL OBJETO EXISTENTE */
      const pizzaExist = state.carrito.find((p) => p.id == pizzaId); // se verifica que la pizza exista dentro del carrito, para incrementarla y no incluirla como nuevo objeto en el arreglo
      if (pizzaExist) {
        dispatch("plus", pizzaId); // invocar la acción "plus" pasando como argumento el id que se recibe como parámetro
      } else {
        const pizza = {id: pizzaId, cant: 1}; // si no existe, se ejecuta la lógica que había anteriormente (comentada)
        commit("ADD_TO_CART", pizza);
      }
      alert("¡Pizza añadida al carrito!"); // se notifica al usuario
    },

    plus({state, commit}, id) { // acción para agregar cantidad de pizzas, recibe destructuración del contexto, donde se extrae el state y el commit, porque se necesita obtener del estado todos los productos que están en el carrito
      const carrito = state.carrito.map((p) =>
        p.id == id ? (p.cant++, p) : p // al momento de identificar la pizza en el carrito, se incrementa el atributo de la cantidad
        );
        commit("UPDATE_CART", carrito); // mutación para actualizar el carrito
    },

    minus({state, commit}, id) { // acción para quitar cantidad de pizzas, recibe destructuración del contexto, donde se extrae el state y el commit, porque se necesita obtener del estado todos los productos que están en el carrito
      const {cant} = state.carrito.find((p) => p.id == id); // se busca la pizza según su id, para que al momento de haber 1 y darle click a -, se identifique cuál pizza es la que hay que eliminar
      let carrito;
      if (cant == 1) { // si la cantidad es igual a 1 y se ejecuta acción de minus
        carrito = state.carrito.filter((p) => p.id !== id); // se crea "nuevo carrito" EXCLUYENDO la pizza que coincide con el id que se recibe en la acción, al tener solo 1 pizza en carrito
      } else {
        carrito = state.carrito.map((p) => (p.id == id ? (p.cant--, p) : p)); // si cantidad es diferente a 1, se mapea el carrito, para disminuir la cantidad
      }
      commit("UPDATE_CART", carrito); // mutación para actualizar el carrito
    }
  },
  getters: {
    pizzaById: (state) => (id) => { // función flecha que consume como parámetro el state, que retorna función flecha que recibe el parámetro id
      const pizza = state.pizzas.find((p) => p.id == id); // se entra al state, atributo pizzas, y se encuentra la que tenga como atributo id el mismo valor del parámetro que estamos recibiendo
      return pizza; // se toma una pizza dentro del arreglo y es la que se retorna/muestra
    },

    carrito: (state) => {
      const carrito = state.carrito.map((p) => { // recorre el carrito para poder obtener cada uno de los productos que está dentro
        const pizza = state.pizzas.find((pizza) => pizza.id == p.id); // por cada una de las pizzas se ocupa método find para encontrar dentro del arreglo el objeto que coincida con el id de cada una de las pizzas del carrito
        return {...pizza, cant: p.cant}; // retorna objeto que incluye todo el modelo de datos de la pizza que se encuentra a través del id y se le incluye la cantidad, valor importante para el carrito
      });
      return carrito; // retorna carrito, un nuevo [], como una mezcla del arreglo de pizzas y de carrito
    },

    total: (state) => {
      return state.carrito.reduce((a, b) => { // recorre arreglo de carrito
        const pizza = state.pizzas.find((p) => p.id == b.id);
        const totalByPizza = b.cant * pizza.price; // cantidad * precio
        return a + totalByPizza; // "a", acumulador + total de pizzas
      }, 0); // valor inicial 0
    },
  },
  modules: {
  }
})
