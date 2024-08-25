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

	await choicesService.createNewChoice(title, poolId);

	res.status(201).send({ message: 'Opção criada com sucesso' });
}

async function pollVote(req, res) {
	const { id: choiceId } = req.params;

	await choicesService.voteOnThePollChoice(choiceId);

	res.sendStatus(201);
}

const choicesController = {
	getChoices,
	pollChoices,
	pollVote,
};

export default choicesController;
