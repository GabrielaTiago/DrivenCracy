export const ERRORS = {
	bad_request: 400,
	unauthorized: 401,
	forbidden: 403,
	not_found: 404,
	conflict: 409,
	unprocessable_entity: 422,
};

class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

const customError = (errorKey, message) => {
	const statusCode = ERRORS[errorKey] || 500;
	throw new CustomError(message, statusCode);
};

export default customError;
