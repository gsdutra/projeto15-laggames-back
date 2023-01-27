import db from '../config/db.js'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

export async function cadastro(req, res) {
    const { nome, email, senha, avatar } = req.body
    const senhaHash = bcrypt.hashSync(senha, 10)

    try {
        const usuarioExiste = await db.collection('users').findOne({ email })

        if (usuarioExiste) {
            return res.status(422).send("Esse email já está cadastrado em nosso banco de dados")
        }
        const usuarioInserido = await db.collection('users').insertOne({ nome, email, senha: senhaHash, avatar })
        if (usuarioInserido) {
            return res.status(201).send("Usuário criado com sucesso")
        }
    } catch (error) {
        res.status(500).send("Ocorreu um erro no banco de dados")
    }


    res.sendStatus(201)
}
export async function login(req, res) {
    const { email, senha } = req.body

    const usuario = await db.collection('users').findOne({ email })

    if (usuario && bcrypt.compareSync(senha, usuario.senha)) {
        const token = uuidV4()

        try {
            await db.collection('sessions').insertOne({
                idUsuario: usuario._id,
                token
            })
            res.send(token)
        } catch (error) {
            console.error(error)
            return res.status(500).send('Ocorreu um erro no banco de dados')
        }

    } else {
        res.status(422).send('Email e/ou senha incorreto(s)')
    }
}