// TESTS UNITARIOS

import { createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex'
import storeConfig from './mocks/store-config'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(storeConfig)

describe("Tests de Vuex", () => {
    const pizza = {cant: 1, id: "P003"} // simulacro de lo que realmente vamos a pasar como payload de un componente a la acción addToCart
    it ('Acción para agregar una pizza al carrito', () => { // it para especificar título
        expect(store.state.carrito).toHaveLength(0) // esperar que el arreglo carrito dentro de state, dentro de store, tenga longitud de 0
        store.dispatch('addToCart', pizza.id) // instancia store en método dispatch, se ejecuta la acción addToCart, pasando como payload el id de la pizza que se crea de forma estática
        expect(store.state.carrito).toEqual([pizza]) // esperar que el arreglo carrito sea igual a un arreglo que tiene como elemento la pizza estática, para comprobar que se agregó correctamente
    })

    it('Acción para aumentar la cantidad de una pizza en el carrito', () => { // aquí, la pizza ya está en carrito
        store.dispatch('plus', pizza.id) // se pasa la misma pizza
        expect(store.state.carrito[0].cant).toBe(2) // esperar que el primer elemento del arreglo carrito, en el atributo cantidad, esta sea 2
    })
})

// npm run test:unit