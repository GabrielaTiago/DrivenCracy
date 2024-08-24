import Joi from 'joi';

const choiceSchema = Joi.object({
	title: Joi.string().trim().required().messages({
		'string.empty': 'O valor de title não é permitido ser vazio',
		'any.required': 'O campo title é obrigatório',
	}),
	poolId: Joi.string().trim().min(0).required().messages({
		'string.empty': 'O valor de poolId não é permitido ser vazio',
		'any.required': 'O campo poolId é obrigatório',
	}),
});

export default choiceSchema;
