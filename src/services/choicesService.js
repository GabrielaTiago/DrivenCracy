import customError from '../errors/errors.js';
import choiceRepository from '../repositories/choiceRepository.js';

async function getAllChoicesFromPoll(pollId) {
	const choices = await choiceRepository.getChoicesByPollId(pollId);

	if (choices.length === 0) customError('not_found', 'Nenhuma opção encontrada para esta enquete');

	return choices;
}

const choicesService = {
	getAllChoicesFromPoll,
};

export default choicesService;
