import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

config();

const uri = process.env.MONGO_URI;
const databaseName = process.env.MONGO_DATABASE_NAME;

let db = null;

async function connectToDatabase() {
	try {
		const mongoClient = new MongoClient(uri);
		await mongoClient.connect();
		db = mongoClient.db(databaseName);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('Error trying to connect to MongoDB: ', err);
		throw err;
	}
}

connectToDatabase();

export { db };
