
describe('Note App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'Tester123',
      password: 'Password'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  ///////////////////////////////////////////
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note App Example 2021')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function() {
    cy.contains('Login').click()
    cy.get('#loginUsername').type('Tester123')
    cy.get('#loginPassword').type('Password')
    cy.get('#loginButton').click()

    cy.contains('Test User logged in')
  })

  ///////////////////////////////////////
  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#loginUsername').type('Tester123')
      cy.get('#loginPassword').type('Password')
      cy.get('#loginButton').click()
    })

    it('a new note can be created', function() {
      cy.contains('New Note').click()
      cy.get('#newNote').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    //////////////////////////////////////////
    describe('and a note exists', function() {
      beforeEach(function() {
        cy.contains('New Note').click()
        cy.get('#newNote').type('another cypress note')
        cy.contains('save').click()
      })

      it('it can be made important', function() {
        cy.contains('another cypress note')
          .contains('mark important')
          .click()

        cy.contains('another cypress note')
          .contains('mark unimportant')
      })

    })
  })
})
