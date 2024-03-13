import * as dotenv from 'dotenv';
import { MongoClient, Db, ServerApiVersion } from 'mongodb';

dotenv.config();

const uri: string = process.env.ATLAS_URI || '';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectToDb = async (): Promise<void> => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected to the database');
  } catch (error: any) {
    console.error('Error connecting to the database', error);
  }
};

connectToDb();

const db: Db = client.db('interns');

export default db;
