const supertest = require('supertest')
const { app, server } = require('../index') //testi käynnistää backendin ja käärii sen kolmannella rivillä funktion supertest avulla ns. superagent-olioksi
const api = supertest(app) //uuttujan api kautta testit voivat tehdä HTTP-pyyntöjä backendiin.
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, nonExistingId, blogsInDb,  usersInDb } = require('./test_helper')

describe('when there is initially some notes saved', async () => {
  beforeAll(async () => {  // alustaa tietokanta ennen kaikkien testin suoritusta
    await Blog.remove({})
    // Taulukkoon noteObjects talletetaan taulukkoon initialNotes talletettuja Javascript-oliota vastaavat Note-konstruktorifunktiolla generoidut Mongoose-oliot.
    //  luodaan uusi taulukko, joka muodostuu promiseista, jotka saadaan kun jokaiselle noteObjects taulukon alkiolle kutsutaan metodia save
    const blogObjects = initialBlogs.map(n => new Blog(n))
    await Promise.all(blogObjects.map(n => n.save()))
    //  Promise.all avulla saadaan koostettua taulukollinen promiseja yhdeksi promiseksi, joka valmistuu, eli menee tilaan fulfilled kun kaikki sen parametrina olevan taulukon promiset ovat valmistuneet
  })

  // Async/await-kikalla saamme pyynnön näyttämään koodin tasolla synkroonisesti toimivalta.
  test('all blogs are returned as json by GET /api/notes', async () => {
    const blogsInDatabase=await blogsInDb()

    const response = await api
      .get('/api/notes') // HTTP GET -pyynnön osoitteeseen api/notes 
      .expect(200) // varmistaa, että pyyntöön vastataan statuskoodilla 200 j
      .expect('Content-Type', /application\/json/) // varmistaa data palautetaan oikeassa muodossa

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedContents = response.body.map(n => n.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedContents).toContain(blog.title)
    })
  })

  test('there are blogs', async () => {
    const blogsInDatabase = await blogsInDb()
    const response = await api
      .get('/api/notes')

    expect(response.body.length).toBe(blogsInDatabase.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/notes')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Jamit')
  })

  test('the first title is Joku', async () => {
    const response = await api
      .get('/api/notes')

    expect(response.body[0].title).toBe('Joku')
  })



  // POST tiedon lähetys
  describe('Addition of a new note', async () => {
  // tehdään kirjautunut käyttäjä jotta voidaan lähettää
    const bloggaaja = {
      username: 'kirjoittaja',
      password: 'salainen'
    }

    const addUser = async () => {
      try {
        const response = await api
          .post('/api/users ')
          .send(bloggaaja)

      } catch (error) {
        console.log(error)
      }
    }

    const getToken = async () => {
      const response = await api
        .post('/api/login')
        .send(bloggaaja)
      return response.body
    }

    beforeAll(async () => {
      await Blog.remove({})
      await addUser()
    })

    test('POST /api/notes succeeds with valid data', async () => {
      const blogsBefore = await blogsInDb()
      const tokenContent = await getToken()
      const newBlog= {
        title: 'added testblog',
        author: 'testaaja',
        url: 'www.testi.com',
        likes: 10
      }

      await api
        .post('/api/notes')
        .send(newBlog)
        .set('Authorization', 'bearer ' + tokenContent.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfter = await blogsInDb()
      expect(blogsAfter.length).toBe(blogsBefore.length+1)
      const contents = blogsAfter.map(r => r.title)
      console.log(contents)
      expect(contents).toContain(newBlog.title)
    })

    test('if added blog doesnt have likes, its 0', async () => {
      const blogsBefore = await blogsInDb()
      const tokenContent = await getToken()

      const newBlog = {
        title: 'testnolikes',
        author: 'testaaja',
        url: 'www'
      }

      await api
        .post('/api/notes')
        .send(newBlog)
        .set('authorization', 'bearer ' + tokenContent.token)
        .expect(200)

      const response = await api
        .get('/api/notes')

      const lastAdded=blogsBefore.length+1
      console.log(lastAdded)
      const likes = response.body.map(r => r.likes)
      console.log(likes)
      expect(likes[lastAdded-1]).toBe(0)

    })


    test('POST /api/notes fails with proper statuscode if content is missing', async () => {
      const tokenContent = await getToken()
      const newBlog = {
        author: 'testaaja',
        likes:'2'

      }
      const blogsAtStart = await blogsInDb()
      await api
        .post('/api/notes')
        .send(newBlog)
        .set('authorization', 'bearer ' + tokenContent.token)
        .expect(400)

      const blogsAfter = await blogsInDb()
      expect(blogsAfter.length).toBe(blogsAtStart.length)
    })
  })


  describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
      addedBlog = new Blog({
        title: 'poisto pyynnöllä HTTP DELETE',
        author: 'poistotesteri',
        url: 'www.testi.com',
        likes: 1
      })
      await addedBlog.save()
    })

    test('DELETE /api/notes/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await blogsInDb()

      await api
        .delete(`/api/notes/${addedBlog._id}`)
        .expect(204)

      const blogsAfter = await blogsInDb()

      const contents = blogsAfter.map(r => r.title)

      expect(contents).not.toContain(addedBlog.title)
      expect(contents).not.toContain(addedBlog.title)
      expect(blogsAfter.length).toBe(blogsAtStart.length - 1)
    })
  })


  ////////////////////////////USER TESTIT///////////////////////////////////////////////

  describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', passwordHash: 'sekret' })
      await user.save()
    })

    test('POST /api/users succeeds with a fresh username', async () => {
      const usersBeforeOperation = await usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
      const usernames = usersAfterOperation.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
      const usersBeforeOperation = await usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body).toEqual({ error: 'username must be unique' })

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })


    test('POST /api/users fails with proper statuscode and message if username is too short', async () => {
      const usersBeforeOperation = await usersInDb()

      const newUser = {
        username: 'sstesti',
        name: 'sstestaaja',
        password: 's'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body).toEqual({ error: 'password must have at least 3 letters' })

      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })
  })

  afterAll(() => {
    server.close()
  })
})