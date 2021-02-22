const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  if (!request.body.likes) {
    request.body.likes = 0
  }

  if (!request.body.title || !request.body.url) {
    response.status(400).json({ error: "parameters missing" })
  } else {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})

module.exports = blogsRouter
