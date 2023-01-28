import joi from 'joi'

const cadastroSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required(),
    confirmaSenha: joi.string().valid(joi.ref('senha')).required(),
    avatar: joi.string().required()
})

export default cadastroSchema