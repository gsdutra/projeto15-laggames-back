import db from '../config/db.js'
import { ObjectId } from "mongodb"

export async function  getGames(req, res) {
    console.log("Rodou Get games")

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", '')
    
    if (!token) return res.status(422).send("Informe o token!")

    const session = await db.collection("sessions").findOne({ token })

    if (!session) return res.status(401).send("Não existe sessão ativa!") 
  
    const user = await db.collection("users").findOne({	_id: session.userId })

    if (!user) return res.status(401).send("Você não fez login")

    const games = await db.collection("games").find().toArray()

    if (!games) return res.status(404).send("Jogos não encontrados")
    
    if(games) { 
        res.send(games).status(200)
    } else {
        res.sendStatus(404)
    }
}

export async function getGameId(req, res) {
    console.log("Rodou GET game id")
    const { id } = req.params;

    try {	
      const game = await db.collection("games").findOne({ _id: (ObjectId(id)) })

      if (!game) return res.status(404).send("Jogo não encontrado")

      if (game) {
        res.send(game).status(200)
      }
      } catch (error) {
        res.status(500).send(error)
      }


}

export async function cadastroGame(req, res) {
  console.log("Rodou POST cadastroGame")
  const game = req.body;  

  try {
    await db.collection("games").insertOne({ title: game.titulo, description: game.descricao, value: game.valor, cape: game.capa });
    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}