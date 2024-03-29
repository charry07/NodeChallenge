import { MongoClient } from 'mongodb';

let db: any;

export const connectToDb = async () => {
  const password = process.env.MONGO_PASSWORD;
  const User = process.env.MONGO_USER;
  const urlCluster = process.env.MONGO_CLUSTER_URL;

  const Url = `mongodb://${User}:${password}@${urlCluster}:27017,${urlCluster}:27017,${urlCluster}:27017/?replicaSet=atlas-y8oxsk-shard-0&ssl=true&authSource=admin`;
  try {
    const client = await MongoClient.connect(Url);
    db = client.db('');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

export const getDb = () => db;