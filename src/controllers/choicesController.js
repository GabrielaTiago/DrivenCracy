import choiceRepository from '../repositories/choiceRepository.js';
import pollRepository from '../repositories/pollRepository.js';
import voteRepository from '../repositories/voteRepository.js';

async function getChoices(req, res) {
	const { id } = req.params;

	try {
		const choicesForThePoll = await choiceRepository.getChoicesByPollId(id);

		res.status(200).send(choicesForThePoll);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function pollChoices(req, res) {
	const { title, poolId } = req.body;

	try {
		const existingPoll = await pollRepository.getPollById(poolId);

		if (!existingPoll) return res.sendStatus(404);

		if (title === '') return res.sendStatus(422);

		const choice = await choiceRepository.getChoicesByTitle(title);

		if (choice.title === title) return res.sendStatus(409);

		const inicialDate = Date.parse(existingPoll.expireAt);
		const currentDate = Date.parse(dayjs().format('YYYY-MM-DD HH:mm'));
		const timeDifference = inicialDate - currentDate;

		if (timeDifference <= 0) return res.sendStatus(403);

		await choiceRepository.createChoice(title, poolId);
		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function pollVote(req, res) {
	const { id } = req.params;
	const creationDate = dayjs().format('YYYY-MM-DD HH:mm');

	try {
		const vote = await choiceRepository.getChoiceById(id);

		if (!vote) res.sendStatus(404);

		const existingPoll = await pollRepository.getPollById(vote.pollId);

		if (!existingPoll) return res.sendStatus(404);

		const inicialDate = Date.parse(existingPoll.expireAt);
		const currentDate = Date.parse(creationDate);
		const timeDifference = inicialDate - currentDate;

		if (timeDifference <= 0) return res.sendStatus(403);

		await voteRepository.createVote(creationDate, id);

		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

const choicesController = {
	getChoices,
	pollChoices,
	pollVote,
};

export default choicesController;
