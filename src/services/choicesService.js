import dayjs from 'dayjs';
import customError from '../errors/errors.js';
import choiceRepository from '../repositories/choiceRepository.js';
import pollRepository from '../repositories/pollRepository.js';
import voteRepository from '../repositories/voteRepository.js';

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

async function voteOnThePollChoice(choiceId) {
	const now = dayjs().format('YYYY-MM-DD HH:mm');
	const pollId = await choiceRepository.getPollIdByChoiceId(choiceId);

	if (!pollId) customError('not_found', 'Nenhuma enquete encontrada para esta opção');

	const poll = await pollRepository.getPollById(pollId);

	if (!poll) customError('not_found', 'Enquete não encontrada');

	const pollExpirationDate = poll.expireAt;

	const isAnActivePoll = dayjs().isBefore(dayjs(pollExpirationDate));

	if (!isAnActivePoll) customError('forbidden', 'Enquete expirada');

	await voteRepository.createVote(now, choiceId);
}

const choicesService = {
	getAllChoicesFromPoll,
	createNewChoice,
	voteOnThePollChoice,
};

export default choicesService;
