import pollRepository from '../repositories/pollRepository.js';
import pollsService from '../services/pollsService.js';

async function createPoll(req, res) {
	const { title, expireAt } = req.body;

	await pollsService.createNewPoll(title, expireAt);

	res.status(201).send({ message: 'Enquete criada com sucesso' });
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
