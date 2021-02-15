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

app.get("/api/persons", (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  Person.findById(req.params.id).then(person => {
    response.json(person)
  })
})

app.post("/api/persons", (req, res) => {  
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
    
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const index = persons.findIndex(person => person.id == id)

  if (index < 0) {
    res.status(404).end()
  }
  else {
    persons.splice(index, 1)
    res.status(200).end()
  }
})

app.get("/info", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  const html = `
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date().toString()}</p>
  `

  res.end(html)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})