import * as express from 'express';
import db from '../db/connection';
import { ObjectId } from 'mongodb';

const router = express.Router();
const collection = db.collection('records');

router.get('/', async (_, res) => {
  const results = await collection.find({}).toArray();
  res.status(200).send(results);
});

router.get('/:id', async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) res.status(404).send('Not found');
  else res.status(200).send(result);
});

router.post('/', async (req, res) => {
  try {
    const { name, lastname, email, position, level } = req.body;
    const newDocument = { name, lastname, email, position, level };
    const result = await collection.insertOne(newDocument);
    res.status(204).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding record');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const { name, lastname, email, position, level } = req.body;
    const updates = { $set: { name, lastname, email, position, level } };
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating record');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting record');
  }
});

export default router;
