import { ObjectId } from 'mongodb';
import { db } from '../databases/mongodb.js';

async function createVote(createdAt, id) {
	return await db.collection('vote').insertOne({
		createdAt,
		choiceId: ObjectId(id),
	});
}

const voteRepository = {
	createVote,
};

export default voteRepository;
