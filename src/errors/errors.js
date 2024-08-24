export const ERRORS = {
	bad_request: 400,
	unauthorized: 401,
	forbidden: 403,
	not_found: 404,
	conflict: 409,
	unprocessable_entity: 422,
};

class CustomError extends Error {
	constructor(type, message) {
		super(message);
		this.type = type;
		this.status = ERRORS[type];
	}
}

export default function throwCustomError(type, message) {
	if (!ERRORS[type]) throw new Error(`Tipo de erro inválido: ${type}`);

	throw new CustomError(type, message);
}
