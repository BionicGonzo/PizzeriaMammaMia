// TESTS END-TO-END (E2E)

describe('Tests del carrito', () => { // verificar la funcionalidad al hacer click al botón agregar, que éste aparezca en el carrito de compras, perspectiva de experiencia de usuario
  it('Botón para agregar una pizza al carrito', () => {
    cy.visit('/') // visita ruta raíz, Home
    const btn = cy.get(':nth-child(1) > .card .btn-danger') // busca dentro de todo lo visible, un elemento que tenga la clase btn-danger, dentro de un elemento clase card, el PRIMERO
    btn.click({force: true}) // hará un click sobre ese elemento
    cy.visit('/carrito') // visitará carrito, comprobando que exista h6 con nombre "napolitana"
    cy.contains("h6", "napolitana")
  })

  it('Botón para eliminar una pizza del carrito', () => { // comprobar que al dar click a - habiendo 1 solo producto, que éste ya no esté en el carrito, que se elimine
    cy.get('.btn-danger').click() // hará click al botón dentro del carrito (-)
    cy.get("h6").should('not.exist') // comprobar que el elemento ya no exista
  })
})

// npm run test:e2e