import { ObjectId } from 'mongodb';
import { db } from '../databases/mongodb.js';

async function createChoice(title, pollId) {
	return await db.collection('choices').insertOne({ title, pollId: ObjectId(pollId) });
}

async function getChoicesByPollId(pollId) {
	return await db
		.collection('choices')
		.find({ pollId: ObjectId(pollId) })
		.toArray();
}

async function getChoicesByTitle(title) {
	return await db.collection('choices').findOne({ title });
}

const choiceRepository = {
	createChoice,
	getChoicesByTitle,
	getChoicesByPollId,
};

export default choiceRepository;
