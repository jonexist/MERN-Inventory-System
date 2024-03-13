import * as dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';

dotenv.config();

const uri = process.env.ATLAS_URI || '';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
};

const db = client.db('interns');

export default db;
