
const express = require('express');
const app = express();
// Habiulitar o uso de JSON
app.use(express.json());
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Endpoint de heroi
const lista = ["Mulher Maravilha", "Capitã Marvel", "Homen de Ferro"];

// Read All - GET /herois
app.get("/herois", (_req, res) => {
  res.send(lista);
});

// Read Single - GET /herois/:id
app.get("/herois/:id", (req, res) => {
  const id = req.params.id - 1;
  const heroi = lista[id];
  res.send(heroi);
});

// Create - POST /herois
app.post("/herois", (req, res) => {
  const heroi = req.body.nome;
  lista.push(heroi);
  // console.log(req.body, typeof req.body);
  res.send("Heroi adicionado com sucesso!");
});

// Update - PUT /herois/:id
app.put("/herois/:id", (req, res) => {
  const id = req.params.id - 1;
  const heroi = req.body.nome;
  lista[id] = heroi;
  res.send(`Heroi atualizado com sucesso!`);
});

// Delete - DELETE /herois/:id
app.delete("/herois/:id", (req, res) => {
  const id = req.params.id - 1;
  delete lista[id];
  res.send(`Heroi removido com sucesso!`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhos: ${port}`);
});
