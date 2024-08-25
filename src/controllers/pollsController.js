import pollsService from '../services/pollsService.js';

async function createNewPoll(req, res) {
	const { title, expireAt } = req.body;

	await pollsService.createNewPoll(title, expireAt);

	res.status(201).send({ message: 'Enquete criada com sucesso' });
}

async function getAllPolls(_, res) {
	const polls = await pollsService.getAllPolls();

	res.status(200).send(polls);
}

async function searchPollResult(req, res) {
	const { id: pollId } = req.params;

	const result = await pollsService.searchPollResult(pollId);

	res.status(200).send(result);
}

const poolsController = {
	createNewPoll,
	getAllPolls,
	searchPollResult,
};

export default poolsController;
