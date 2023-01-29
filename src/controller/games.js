import db from '../config/db.js'
import { ObjectId } from "mongodb"

export async function  getGames(req, res) {    
    const session = res.locals.sessao
    if (!session) return res.status(401).send("Não existe sessão ativa!") 

    const user = await db.collection("users").findOne({	_id: session.userId })
    if (!user) return res.status(401).send("Você não fez login")

    const games = await db.collection("games").find().toArray()
    if (!games) return res.status(404).send("Jogos não encontrados")
    
    if(games) { 
      return res.send(games).status(200)
    } else {
      return res.sendStatus(404)
    }
}

export async function getGameId(req, res) {
    const { id } = req.params;

    try {	
      const game = await db.collection("games").findOne({ _id: (ObjectId(id)) })
      if (!game) return res.status(404).send("Jogo não encontrado")
      if (game) return res.send(game).status(200)
    } catch (error) {
      return res.status(500).send(error)
    }


}

export async function cadastroGame(req, res) {
  const game = req.body;  

  try {
    await db.collection("games").insertOne({ title: game.titulo, description: game.descricao, value: game.valor, cape: game.capa });
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteGameId(req, res) {
  const { id } = req.params;

  try {	
    const game = await db.collection("games").findOne({ _id: (ObjectId(id)) })

    if (game) {
      await db.collection("games").deleteOne({ _id: ObjectId(id) })      
      return res.sendStatus(200)
    }
    } catch (error) {
      return res.status(500).send(error)
    }


}