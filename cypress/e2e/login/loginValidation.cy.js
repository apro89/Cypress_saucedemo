/// <reference types="cypress" />

const usernameValid = 'standard_user'
const passwordValid = 'secret_sauce'
const usernameNotValid = 'standard_usere'
const passwordNotValid = 'secret_saucee'
const usernameLockedOut = 'locked_out_user'
const usernameProblem = 'problem_user'
const usernamePerformance = 'performance_glitch_user'


it('Successful login', () => {
    cy.login(usernameValid, passwordValid)
    cy.url().should('include', '/inventory')
    cy.getCookie('session-username').should('exist')
})

it('User cannot login with a valid username and an invalid password', () => {
    cy.login(usernameValid, passwordNotValid)
    cy.VerifyError('Epic sadface: Username and password do not match any user in this service')
})

it('User cannot login with a valid password and an invalid username', () => {
    cy.login(usernameNotValid, passwordValid)
    cy.VerifyError('Epic sadface: Username and password do not match any user in this service')
})

it('User cannot login with an invalid username and an invalid password', () => {
    cy.login(usernameNotValid, passwordNotValid)
    cy.VerifyError('Epic sadface: Username and password do not match any user in this service')
})

it('Verify when the username field is blank and Submit button is clicked.', () => {
    cy.login(null, passwordValid)
    cy.VerifyError('Epic sadface: Username is required')
})

it('Verify when the password field is blank and Submit button is clicked.', () => {
    cy.login(usernameValid, null)
    cy.VerifyError('Epic sadface: Password is required')
})

it('Verify when the username and password fields are blank and Submit button is clicked.', () => {
    cy.login(null, null)
    cy.VerifyError('Epic sadface: Username is required')
})

it('Verify if the data in password field is either visible as asterisk or bullet signs.', () => {
    cy.login(null, passwordValid)
    cy.get(`input[data-test='password']`)
    .invoke('attr', 'type')
    .should('eq', 'password')
})

it('Verify locked out user', () => {
    cy.login(usernameLockedOut, passwordValid)
    cy.VerifyError('Epic sadface: Sorry, this user has been locked out.')
})

it('Verify user has a problem - imgs are 404', () => {
    cy.login(usernameProblem, passwordValid)
    cy.get('.inventory_item img').each(($el) => {
        cy.wrap($el).invoke('attr', 'src').should('eq', '/static/media/sl-404.168b1cce.jpg')
    }) 
})

it('Verify user has a problem with performance', () => {
    cy.login(usernamePerformance, passwordValid)
    cy.window()
    .its('performance')
    .invoke('measure', 'pageOpen')
    .its('duration', { timeout: 0 })
    .should('be.greaterThan', 5000)
})