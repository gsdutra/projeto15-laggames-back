import joi from 'joi'

const cadastroGameSchema = joi.object({
    titulo: joi.string().required(),
    descricao: joi.string().required(),
    valor: joi.string().required(),
    capa: joi.string().required()    
})

export default cadastroGameSchema