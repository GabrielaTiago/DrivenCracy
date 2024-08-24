import joi from 'joi';

const voteSchema = joi.object({
	createdAt: joi.date().required().messages({
		'date.base': 'O campo createdAt deve ser uma data válida',
		'any.required': 'O campo createdAt é obrigatório',
	}),
	choiceId: joi.string().trim().required().messages({
		'string.empty': 'O valor de choiceId não é permitido ser vazio',
		'any.required': 'O campo choiceId é obrigatório',
	}),
});

export default voteSchema;
