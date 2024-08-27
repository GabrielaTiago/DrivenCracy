import dayjs from 'dayjs';
import customError from '../errors/errors.js';
import choiceRepository from '../repositories/choiceRepository.js';
import pollRepository from '../repositories/pollRepository.js';
import voteRepository from '../repositories/voteRepository.js';

async function createNewPoll(title, expireAt) {
	const today = new Date();
	const isPastDate = dayjs(today).isAfter(dayjs(expireAt));
	if (isPastDate) customError('forbidden', 'Data de expiração inválida');

	const pollTitle = await pollRepository.getPollByTitle(title);

	if (pollTitle) customError('conflict', 'Já existe uma enquete com este título');

	let date = expireAt;
	if (date === '') {
		const defaultPoll = dayjs().add('30', 'day');
		date = defaultPoll.format('YYYY-MM-DD HH:mm');
	}

	await pollRepository.createPoll(title, date);
}

async function getAllPolls() {
	const polls = await pollRepository.getPolls();

	if (polls.length === 0) customError('not_found', 'Nenhuma enquete foi criada até o momento');

	return polls;
}

async function searchPollResult(pollId) {
	const poll = await pollRepository.getPollById(pollId);

	if (!poll) customError('not_found', 'Enquete não encontrada');

	const choices = await choiceRepository.getChoicesByPollId(pollId);

	if (choices.length === 0) customError('not_found', 'Nenhuma opção encontrada para esta enquete');

	const voting = await Promise.all(
		choices.map(async (choice) => {
			const votesQuantity = await voteRepository.getVotesQuantityByChoiceId(choice._id);
			return { title: choice.title, votes: votesQuantity };
		})
	);

	const { title, votes } = voting.reduce((prev, current) => (prev.votes > current.votes ? prev : current), {});

	await pollRepository.updatePoll(pollId, { title, votes });

	const result = await pollRepository.getPollById(pollId);
	return result;
}

const pollsService = {
	createNewPoll,
	getAllPolls,
	searchPollResult,
};

export default pollsService;
