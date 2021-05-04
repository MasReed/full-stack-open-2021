
describe('Note App', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note App Example 2021')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('#loginUsername').type('fresca')
    cy.get('#loginPassword').type('fresca')
    cy.get('#loginButton').click()

    cy.contains('fresca logged in')
  })
})
