import { getGames, getGameId } from "../controller/games.js"
import { Router } from 'express'
  
const GamesRoutes = Router()

GamesRoutes.get("/games", getGames)
GamesRoutes.get("/game/:id", getGameId)

export default GamesRoutes