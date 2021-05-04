describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'Tester123',
      password: 'Password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened and login form is displayed', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.get('#loginForm')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#loginUsername').type('Tester123')
      cy.get('#loginPassword').type('Password')
      cy.get('#loginButton').click()

      cy.get('.notification')
        .should('contain', 'Tester123 successfully logged in!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('contain', 'Tester123 is logged in')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#loginUsername').type('Tester123')
      cy.get('#loginPassword').type('incorrect')
      cy.get('#loginButton').click()

      cy.get('.notification')
        .should('contain', 'Invalid Username or Password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Tester123 is logged in')

    })
  })
})
