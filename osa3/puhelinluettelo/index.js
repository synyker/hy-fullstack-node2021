const { response } = require("express");
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body)
})
const app = express()

app.use(express.json());
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

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    numer: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-532523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12345678"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "123123123"
  }
]

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id == id)

  if (!person) {
    res.status(404).end()
  }
  else {
    res.json(person)
  }
})

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * Math.floor(1000000));

  if (!req.body || !req.body.name || !req.body.number) {
    res.status(400).send(
      {
        error: "name or number not given"
      }
    )
  } else if (persons.find(person => person.name === req.body.name)) {
    res.status(400).send(
      {
        error: "name must be unique"
      }
    )
  } else {
    const person = {
      id: id,
      name: req.body.name,
      number: req.body.number
    }

    persons.push(person)

    res.json(person)
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