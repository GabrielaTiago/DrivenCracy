export default function errorHandler(err, req, res, next) {
	try {
		if (err instanceof Error) {
			const { statusCode, message } = err;
			return res.status(statusCode).send({ error: true, message });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send({ error: true, message: 'Internal Server Error' });
	}
}
