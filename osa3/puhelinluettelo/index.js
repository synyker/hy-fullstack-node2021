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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})