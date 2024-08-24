import customError from '../errors/errors.js';
import choiceRepository from '../repositories/choiceRepository.js';
import pollRepository from '../repositories/pollRepository.js';
import voteRepository from '../repositories/voteRepository.js';

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
	searchPollResult,
};

export default pollsService;
