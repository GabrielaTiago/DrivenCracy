import { ObjectId } from 'mongodb';
import { db } from '../databases/mongodb.js';

async function createChoice(title, pollId) {
	return await db.collection('choices').insertOne({ title, pollId: new ObjectId(String(pollId)) });
}

async function getChoicesByPollId(pollId) {
	return await db
		.collection('choices')
		.find({ pollId: new ObjectId(String(pollId)) })
		.toArray();
}

async function getChoicesByTitle(title) {
	return await db.collection('choices').findOne({ title });
}

async function getPollIdByChoiceId(choiceId) {
	const choice = await db.collection('choices').findOne({ _id: new ObjectId(String(choiceId)) });
	const pollId = new ObjectId(String(choice.pollId)).toString();
	return pollId;
}

const choiceRepository = {
	createChoice,
	getChoicesByTitle,
	getChoicesByPollId,
	getPollIdByChoiceId,
};

export default choiceRepository;
