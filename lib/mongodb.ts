import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/carenest';
console.log("MongoDB URI:", uri); // Debug URI

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log("Connecting to MongoDB in development..."); // Debug
    globalWithMongo._mongoClientPromise = client.connect()
      .then(() => {
        console.log("MongoDB connected successfully");
        return client;
      })
      .catch(err => {
        console.error("MongoDB connection failed:", err);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  console.log("Connecting to MongoDB in production..."); // Debug
  clientPromise = client.connect()
    .then(() => {
      console.log("MongoDB connected successfully");
      return client;
    })
    .catch(err => {
      console.error("MongoDB connection failed:", err);
      throw err;
    });
}

export default clientPromise;