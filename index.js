require("dotenv").config()
const { response } = require("express");
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body)
})
const app = express()

app.use(express.json());
app.use(express.static("build"))
app.use(cors())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
    tokens["body"](req, res)
  ].join(" ")
}))

const Person = require("./models/person")

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
  console.log(req.params.id)
  Person.findById(req.params.id)
    .then(person => {
      console.log(person)
      res.json(person)
    })
    .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {  
  const id = Math.floor(Math.random() * Math.floor(1000000));

  if (!req.body || !req.body.name || !req.body.number) {
    res.status(400).send(
      {
        error: "name or number not given"
      }
    )
  // } else if (persons.find(person => person.name === req.body.name)) {
  //   res.status(400).send(
  //     {
  //       error: "name must be unique"
  //     }
  //   )
  } else {
    const person = new Person({
      name: req.body.name,
      number: req.body.number
    })
    
    person.save()
      .then(savedPerson => {
        res.json(savedPerson)
      })
      .catch(error => next(error))
  }
})

app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {

  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.get("/info", (req, res) => {
  Person.find({})
    .then(result => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      const html = `
        <p>Phonebook has info for ${result.length} people.</p>
        <p>${new Date().toString()}</p>
      `
    
      res.end(html)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})