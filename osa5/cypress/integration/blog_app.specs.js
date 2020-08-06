describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testname',
      password: 'testpassword',
      username: 'testusername'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('testusername')
      cy.get('input[name="Password"]').type('testpassword')
      cy.get('#loginButton').click()

      cy.contains('testname logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('wrongusername')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('#loginButton').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('html').should('not.contain', 'testname logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testusername', password: 'testpassword'
      }).then(response => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('testTitle')
      cy.get('input[name="author"]').type('testAuthor')
      cy.get('input[name="url"]').type('testUrl')
      cy.get('#createButton').click()
      cy.contains('testTitle')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('testTitle')
      cy.get('input[name="author"]').type('testAuthor')
      cy.get('input[name="url"]').type('testUrl')
      cy.get('#createButton').click()

      cy.contains('show').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog can be removed', function() {
      cy.createBlog({
        title: 'test', author: 'test', url: 'test' })
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.get('html').should('not.contain', 'testTitle')
    })

    it('Blogs are sorted by likes', function() {
      for(var x=1; x<5; x++){
        const ranInt = Math.floor(Math.random() * 10)
        console.log(ranInt)
        cy.createBlog({
          title: `testTitle${x}`,
          author: `testAuthor${x}`,
          url: `testUrl${x}`,
          likes: ranInt
        })
      }
      cy.get('button:contains(show)').click({ multiple: true })
      cy.get('.Blog').its('length').should('eq', x-1)
      for(var y = 1;y < x-1; y++){
        cy.get('.Blog').eq(y).invoke('text').then((text1) => {
          cy.get('.Blog').eq(y-1).invoke('text').then((text2) => {
            const test1 = text1[text1.search('likes')+6]
            const test2 = text2[text2.search('likes')+6]
            if(test2 > test1){
              throw new Error('test fails here')
            }else{
              x--
            }
          })
        })
      }
    })
  })
})