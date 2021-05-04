
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

  it('login fails with wrong password', function() {
    cy.contains('Login').click()
    cy.get('#loginUsername').type('Tester123')
    cy.get('#loginPassword').type('Invalid')
    cy.get('#loginButton').click()

    cy.get('.error-notification')
      .should('contain', 'Invalid credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Test User logged in')
  })

  ///////////////////////////////////////
  describe('when logged in', function() {
    beforeEach(function() {
      // see ./support/commands
      cy.login({ username: 'Tester123', password: 'Password' })
    })

    it('a new note can be created', function() {
      cy.contains('New Note').click()
      cy.get('#newNote').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    //////////////////////////////////////////
    describe('and several notes exists', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('other of those can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'mark unimportant')
      })

    })
  })
})
