import choicesService from '../services/choicesService.js';

async function getAllChoicesFromThePoll(req, res) {
	const { id: pollId } = req.params;

	const pollChoices = await choicesService.getAllChoicesFromPoll(pollId);

	res.status(200).send(pollChoices);
}

async function createNewChoice(req, res) {
	const { title, poolId } = req.body;

	await choicesService.createNewChoice(title, poolId);

	res.status(201).send({ message: 'Opção criada com sucesso' });
}

async function voteOnThePollChoice(req, res) {
	const { id: choiceId } = req.params;

	await choicesService.voteOnThePollChoice(choiceId);

	res.status(201).send({ message: 'Voto computado com sucesso' });
}

const choicesController = {
	getAllChoicesFromThePoll,
	createNewChoice,
	voteOnThePollChoice,
};

export default choicesController;
