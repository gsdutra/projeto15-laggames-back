import db from '../config/db.js'
//import dayjs from 'dayjs'
import { ObjectId } from "mongodb"

//let data = dayjs().format("DD/MM")

export async function  getGames(req, res) {
    console.log("Rodou Get games")
  
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