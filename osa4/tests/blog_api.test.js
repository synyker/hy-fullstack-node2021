describe('blog api', () => {
  const mongoose = require('mongoose')
  const supertest = require('supertest')
  const app = require('../app')
  
  const api = supertest(app)
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('blogs have id', async () => {
    const res = await api
      .get('/api/blogs')
      .expect('Content-Type', /application\/json/)
  
    res.body.forEach((blog) => expect(blog.id).toBeDefined)
  })

  test('blog post request works', async () => {
    const before = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newBlog = {
      "title": "test_title",
      "author": "jonne",
      "url": "http://localhost:3001/blogs/test-title-blog",
      "likes": 0
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const after = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(after.body.length).toBe(before.body.length + 1)
      
  })

  test('blog likes is set to zero if not given', async () => {
    const newBlog = {
      "title": "test_title",
      "author": "jonne",
      "url": "http://localhost:3001/blogs/test-title-blog",
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(res.body.likes).toBe(0)
  })

  test('blog returns bad request if title or url missing', async () => {
    const blogWithoutTitle = {
      "author": "jonne",
      "url": "http://localhost:3001/blogs/test-title-blog",
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    const blogWithoutUrl = {
      "author": "jonne",
      "title": "test"
    }
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })
})
