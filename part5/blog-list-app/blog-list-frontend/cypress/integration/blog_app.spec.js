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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Tester123', password: 'Password' })
    })

    it('A blog can be created', function() {
      cy.contains('New Post').click()
      cy.get('#newBlogTitle').type('A Title')
      cy.get('#newBlogAuthor').type('An Author')
      cy.get('#newBlogUrl').type('A Url')
      cy.get('#createBlog').click()

      cy.get('.blogTitle').should('contain', 'A Title')
      cy.get('.blogAuthor').should('contain', 'An Author')
    })

    describe('With several blogs', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'First', author: 'AAA', url:'.com' })
        cy.createBlog({ title: 'Second', author: 'BBB', url:'.com' })
        cy.createBlog({ title: 'Third', author: 'CCC', url:'.com' })
      })

      it('A blog can be liked', function() {
        cy.contains('First').parent()
          .contains('Details')
          .click()

        cy.contains('First').parent()
          .contains('Like')
          .click()

        cy.get('.notification')
          .should('contain', 'Liked!')
          .and('have.css', 'color', 'rgb(0, 0, 255)')
          .and('have.css', 'border-style', 'solid')

        cy.contains('likes:').should('contain', '1')
      })

      it.only('A blog can be deleted by the user who created it', function() {
        cy.contains('Second').parent().as('theBlog')

        cy.get('@theBlog')
          .contains('Details')
          .click()

        cy.get('@theBlog')
          .contains('Delete')
          .click()

        cy.get('.notification')
          .should('contain', 'deleted!')

        cy.get('html').should('not.contain', '@theBlog')
      })
    })

  })
})
