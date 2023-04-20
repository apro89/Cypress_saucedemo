// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  Cypress.Commands.add('login', (username, password) => {
    cy.visit('/')
    if (username) {
        cy.get('input[data-test=username]').type(username)
    }
    if(password) {
        cy.get('input[data-test=password]').type(password)
    }
    cy.get(`input[data-test='login-button']`).click();
  })

  Cypress.Commands.add('VerifyCards', (cards) => {
    cy.get('.cart_item').should('have.length', cards).each(($el) => {
        cy.wrap($el).should('exist').find('.inventory_item_price').invoke('text').should('contain', '$').should('contain', '99')
        cy.wrap($el).find('.cart_quantity').invoke('text').should('equal', '1')
    }) 
  })

  Cypress.Commands.add('VerifyError', (error) => {
    cy.get(`h3[data-test='error']`).invoke('text').then(text => {
        cy.wrap(text)
        .should('contain', error)
    })
  })