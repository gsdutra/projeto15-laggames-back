import db from '../config/db.js'
//import dayjs from 'dayjs'
//import { ObjectId } from "mongodb"

//let data = dayjs().format("DD/MM")

//------------------------HOME-----------------------------------
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