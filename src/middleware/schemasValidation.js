import customError from '../errors/errors.js';
import schemas from '../schemas/schemas.js';

export default function schemasValidation(schema) {
	return (req, res, next) => {
		const data = req.body;
		const { error } = schemas[schema].validate(data, { abortEarly: false });

		if (error) customError('unprocessable_entity', error.details.map((err) => err.message).join('\n'));

		return next();
	};
}
