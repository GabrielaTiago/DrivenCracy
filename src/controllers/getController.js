import { count } from '../middleware/counter.js';
import choiceRepository from '../repositories/choiceRepository.js';
import pollRepository from '../repositories/pollRepository.js';

async function getPolls(req, res) {
	try {
		const allPolls = await pollRepository.getPolls();
		res.status(200).send(allPolls);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

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

async function getResult(req, res) {
	const { id } = req.params;

	try {
		const poll = await pollRepository.getPollById(id);

		if (!poll) return res.sendStatus(404);

		await pollRepository.updatePoll(id, {
			title: poll.title,
			votes: count,
		});

		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export { getPolls, getChoices, getResult };
