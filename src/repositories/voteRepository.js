import { ObjectId } from 'mongodb';
import { db } from '../databases/mongodb.js';

async function createVote(createdAt, choiceId) {
	return await db.collection('vote').insertOne({
		createdAt,
		choiceId: new ObjectId(String(choiceId)),
	});
}

const voteRepository = {
	createVote,
};

export default voteRepository;
