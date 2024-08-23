import { ObjectId } from 'mongodb';
import { db } from '../databases/mongodb.js';

async function createPoll(title, expireAt) {
	await db.collection('polls').insertOne({ title, expireAt });
}

async function getPolls() {
	return await db.collection('polls').find({ isActive: true }).toArray();
}

async function getPollByTitle(title) {
	const poll = await db.collection('polls').findOne({ title });
	return poll;
}

async function getPollById(pollId) {
	return await db.collection('polls').findOne({ _id: new ObjectId(String(pollId)) });
}

async function updatePoll(pollId, { title, votes }) {
	return await db.collection('polls').updateOne(
		{ _id: new ObjectId(String(pollId)) },
		{
			$set: {
				result: { title, votes },
			},
		}
	);
}

const pollRepository = {
	createPoll,
	getPolls,
	getPollByTitle,
	getPollById,
	updatePoll,
};

export default pollRepository;
