const testUser = {
  username: 'tester',
  name: 'Tester',
  password: 'ABC123'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(testUser.username)
      cy.get('#password').type(testUser.password)
      cy.get('#login-button').click()
      cy.contains(`${testUser.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(testUser.username)
      cy.get('#password').type('PASSWORD')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type(testUser.username)
      cy.get('#password').type(testUser.password)
      cy.get('#login-button').click()
    })

    describe('and blog has been created', function() {
      beforeEach(function() {
        cy.contains('add blog').click()
        cy.get('#title').type('Hello world')
        cy.get('#author').type('Shakespeare')
        cy.get('#url').type('http://example.com')
        cy.get('#add-blog').click()
      })

      it('shows on the page', function() {
        cy.contains('Created blog')
        cy.contains('Hello world')
        cy.contains('Shakespeare')
      })

      it('can be liked', function() {
        cy.contains('show').click()
        cy.contains('likes 0')
        cy.get('.like-button').click()
        cy.contains('likes 1')
      })

      it('can be removed', function() {
        cy.contains('show').click()
        cy.contains('remove')
        cy.get('.remove-button').click()
      })
    })
  })
})
