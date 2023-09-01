const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

// const url = 'mongodb://localhost:27017';
const url = "'mongodb+srv://admin:nk7tFlssxS6vi8np@cluster0.fqyldgm.mongodb.net';";
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
  const port = process.env.PORT || 3000;

  app.get('/', (_req, res) => {
    res.send('Hello World!');
  });

  // Read All - GET /herois
  app.get("/herois", async (_req, res) => {
    const itens = await collection.find().toArray();
    res.send(itens);
  });

  // Read Single - GET /herois/:id
  app.get("/herois/:id", async (req, res) => {
    const id = req.params.id;
    const heroi = await collection.findOne({ _id: new ObjectId(id) })
    res.send(heroi);
  });

  // Create - POST /herois
  app.post("/herois", async (req, res) => {
    const heroi = req.body;
    await collection.insertOne(heroi);
    res.send(heroi);
  });

  // Update - PUT /herois/:id
  app.put("/herois/:id", async (req, res) => {
    const id = req.params.id;
    const heroi = req.body;
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: heroi },
    );
    res.send(heroi);
  });

  // Delete - DELETE /herois/:id
  app.delete("/herois/:id", async (req, res) => {
    const id = req.params.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.send(`Heroi removido com sucesso!`);
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhos: ${port}`);
  });
}

main();
