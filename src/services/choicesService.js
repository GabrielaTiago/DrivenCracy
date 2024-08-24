import dayjs from 'dayjs';
import customError from '../errors/errors.js';
import choiceRepository from '../repositories/choiceRepository.js';
import pollRepository from '../repositories/pollRepository.js';

async function getAllChoicesFromPoll(pollId) {
	const choices = await choiceRepository.getChoicesByPollId(pollId);

	if (choices.length === 0) customError('not_found', 'Nenhuma opção encontrada para esta enquete');

	return choices;
}

async function createNewChoice(title, pollId) {
	const poll = await pollRepository.getPollById(pollId);

	if (!poll) customError('not_found', 'Enquete não encontrada');

	const pollChoices = await choiceRepository.getChoicesByPollId(pollId);

	for (const choice of pollChoices) {
		if (choice.title === title) customError('conflict', 'Opção já cadastrada nessa enquete');
	}

	const pollExpirationDate = poll.expireAt;

	const isAnActivePoll = dayjs().isBefore(dayjs(pollExpirationDate));

	if (!isAnActivePoll) customError('forbidden', 'Enquete expirada');

	await choiceRepository.createChoice(title, pollId);
}

const choicesService = {
	getAllChoicesFromPoll,
	createNewChoice,
};

export default choicesService;
