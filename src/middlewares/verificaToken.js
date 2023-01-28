import db from '../config/db.js'

export async function verificaToken(req, res, next) {
   
    const { Authorization } = req.headers
    const token = Authorization?.replace("Bearer ", '')
    console.log("rodou token")
    console.log(Authorization)

  if (!token) return res.status(422).send("Informe o token!")

  try {
    const session = await db.collection("sessions").findOne({ token })

    if (!session) return res.status(401).send("Você não tem autorização")    

    res.locals.sessao = session   

    next()

  } catch (error) {
    res.status(500).send(error)
  }
}