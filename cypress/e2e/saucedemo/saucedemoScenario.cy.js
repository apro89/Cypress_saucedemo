/// <reference types="cypress" />

const username = 'standard_user'
const password = 'secret_sauce'

it('Saucedemo testing', () => {
    cy.login(username, password)
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').should('not.exist');
    cy.get('.bm-burger-button').click()
    cy.contains('All Items').click()
    cy.get(`button[data-test='add-to-cart-sauce-labs-onesie']`).click()
    cy.get('select').select('Price (high to low)')
    cy.get(`button[data-test='add-to-cart-sauce-labs-bike-light']`).click()
    cy.get('select').select('Price (low to high)')
    cy.get(`button[data-test='add-to-cart-sauce-labs-backpack']`).click()
    cy.get('.shopping_cart_link').click()
    cy.VerifyCards(3)
    cy.get(`button[data-test='remove-sauce-labs-onesie']`).click()
    cy.get(`button[data-test='checkout']`).click()
    cy.get(`input[data-test='firstName']`).type('Oleksii')
    cy.get(`input[data-test='lastName']`).type('Prokhorets')
    cy.get(`input[data-test='postalCode']`).type(49000)
    cy.get(`input[data-test='continue']`).click()
    cy.VerifyCards(2)
    cy.get(`button[data-test='finish']`).click()
    cy.get('.complete-header').should('contain', 'Thank you for your order!')
    cy.get(`button[data-test='back-to-products']`).click()
    cy.get('.bm-burger-button').click()
    cy.contains('Logout').click()
})