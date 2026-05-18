import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

if (!process.env.MONGODB_URI) {
  console.warn('MONGODB_URI environment variable is not set - database features will be unavailable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('webiox');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
