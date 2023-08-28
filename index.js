
const express = require('express')
const app = express()
const port = 3000

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.get('/oi', (_req, res) => {
  res.send('Olá, mundo!')
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhos: ${port}`)
})