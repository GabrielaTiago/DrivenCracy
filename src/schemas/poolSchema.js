import joi from 'joi';

const poolSchema = joi.object({
    title: joi.string().trim().required().messages({
        'string.empty': 'O valor de title não é permitido ser vazio',
        'any.required': 'O campo title é obrigatório',
    }),
    expireAt: joi.date().required().messages({
        'date.base': 'O campo expireAt deve ser uma data válida',
        'any.required': 'O campo expireAt é obrigatório',
    }),
});

export default poolSchema;