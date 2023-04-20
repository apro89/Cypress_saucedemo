/// <reference types="cypress" />

const housesArray = [
    'House Allyrion of Godsgrace',
    'House Blackmont of Blackmont',
    'House Briar',
    'House Brook',
    'House Brownhill',
    'House Dalt of Lemonwood',
    'House Dayne of High Hermitage',
    'House Dayne of Starfall',
    'House Drinkwater',
    'House Dryland'
]
const house = 'Dorne'

it('Get houses', () => {
    cy.request(`https://www.anapioficeandfire.com/api/houses?region=${house}`).then((response) => {
        expect(response.status).to.eq(200)
        cy.get(response.body).each(($el) => {
            expect($el.name).to.be.oneOf(housesArray)
        })
    })
})