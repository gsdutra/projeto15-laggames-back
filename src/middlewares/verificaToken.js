import db from '../config/db.js'

export async function verificaToken(req, res, next) {
   
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')

  if (!token) return res.status(422).send("Informe o token!")

  try {
    const session = await db.collection("sessions").findOne({ token })
    
    if (!session) return res.status(401).send("Você não tem autorização")  

    res.locals.sessao = session

    console.log("Sucesso no token")

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}