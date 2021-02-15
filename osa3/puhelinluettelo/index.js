const express = require('express')
const app = express()

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

app.get("/info", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  const html = `
    <p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date().toString()}</p>
  `
  res.end(html)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})