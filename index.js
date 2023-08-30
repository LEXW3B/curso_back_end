const express = require('express');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'jornada-back-end-2023';
const client = new MongoClient(url);

async function main() {
  console.info('Conectando ao banco de dados...');
  await client.connect();
  console.info('Bando de dados conectado com sucesso!');

  const db = client.db(dbName);
  const collection = db.collection('herois');


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
  app.get("/herois", async (_req, res) => {
    const itens = await collection.find().toArray();
    res.send(itens);
  });

  // Read Single - GET /herois/:id
  app.get("/herois/:id", (req, res) => {
    const id = req.params.id - 1;
    const heroi = lista[id];
    res.send(heroi);
  });

  // Create - POST /herois
  app.post("/herois", async (req, res) => {
    const heroi = req.body;
    await collection.insertOne(heroi);
    res.send(heroi);
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
}

main();
