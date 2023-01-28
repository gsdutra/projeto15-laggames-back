import { getGames, getGameId, cadastroGame } from "../controller/games.js"
import { Router } from 'express'
import { verificaToken } from "../middlewares/verificaToken.js"
  
const GamesRoutes = Router()

GamesRoutes.get("/game/:id", getGameId)

//GamesRoutes.use(verificaToken)
GamesRoutes.get("/games", getGames)
GamesRoutes.post("/cadastroGame", cadastroGame)

export default GamesRoutes