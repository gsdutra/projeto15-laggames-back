import { getGames } from "../controller/games.js"
import { Router } from 'express'
//import { verificaToken } from "../middleware/verificaToken.js"
  
const GamesRoutes = Router()

GamesRoutes.get("/games", getGames)

export default GamesRoutes