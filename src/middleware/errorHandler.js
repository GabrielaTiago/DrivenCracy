import { ERRORS } from '../errors/errors.js';

export default function errorHandler(error, req, res, next) {
	const { type, message } = error;
	const statusCode = ERRORS[type];

	if (statusCode) {
		return res.status(statusCode).send({ error: message });
	}

	console.error(error);
	res.status(500).send({ error: 'Internal Server Error 2' });
}
