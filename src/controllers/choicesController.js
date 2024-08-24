import dayjs from 'dayjs';
import choiceRepository from '../repositories/choiceRepository.js';
import pollRepository from '../repositories/pollRepository.js';
import voteRepository from '../repositories/voteRepository.js';

import choicesService from '../services/choicesService.js';

async function getChoices(req, res) {
	const { id: pollId } = req.params;

	const pollChoices = await choicesService.getAllChoicesFromPoll(pollId);

	res.status(200).send(pollChoices);
}

async function pollChoices(req, res) {
	const { title, poolId } = req.body;

	try {
		const existingPoll = await pollRepository.getPollById(poolId);

		if (!existingPoll) return res.sendStatus(404);

		if (title === '') return res.sendStatus(422);

		const choice = await choiceRepository.getChoicesByTitle(title);

		if (choice) return res.sendStatus(409);

		const endDate = Date.parse(existingPoll.expireAt);
		const currentDate = Date.parse(dayjs().format('YYYY-MM-DD HH:mm'));
		const timeDifference = endDate - currentDate;

		if (timeDifference <= 0) return res.sendStatus(403);

		await choiceRepository.createChoice(title, poolId);
		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function pollVote(req, res) {
	const { id: choiceId } = req.params;
	const now = dayjs().format('YYYY-MM-DD HH:mm');

	try {
		const pollId = await choiceRepository.getPollIdByChoiceId(choiceId);

		if (!pollId) res.sendStatus(404);

		const existingPoll = await pollRepository.getPollById(pollId);

		if (!existingPoll) return res.sendStatus(404);

		const endDate = Date.parse(existingPoll.expireAt);
		const currentDate = Date.parse(now);
		const timeDifference = endDate - currentDate;

		if (timeDifference <= 0) return res.sendStatus(403);

		await voteRepository.createVote(now, choiceId);

		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const choicesController = {
	getChoices,
	pollChoices,
	pollVote,
};

export default choicesController;
