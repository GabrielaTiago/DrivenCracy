import dayjs from 'dayjs';
import pollRepository from '../repositories/pollRepository.js';
import pollsService from '../services/pollsService.js';

async function createPoll(req, res) {
	const { title, expireAt } = req.body;
	let date = expireAt;

	if (title === '') return res.sendStatus(422);

	if (expireAt === '') {
		const defaultPoll = dayjs().add('30', 'day');
		date = defaultPoll.format('YYYY-MM-DD HH:mm');
	}

	try {
		const pollTitle = await pollRepository.getPollByTitle(title);

		if (pollTitle.title === title) return res.sendStatus(409);

		await pollRepository.createPoll(title, date);

		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function getPolls(req, res) {
	try {
		const allPolls = await pollRepository.getPolls();
		res.status(200).send(allPolls);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function getResult(req, res) {
	const { id: pollId } = req.params;

	const result = await pollsService.searchPollResult(pollId);

	res.status(200).send(result);
}

const poolsController = {
	createPoll,
	getPolls,
	getResult,
};

export default poolsController;
