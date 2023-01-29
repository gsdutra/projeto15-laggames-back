import schemaValidation from "../middlewares/schemaValidationMiddleware.js";
import cadastroGameSchema from "../schema/cadastroGameSchema.js";
import { getGames, getGameId, cadastroGame, deleteGameId } from "../controller/games.js"
import { Router } from 'express'
import { verificaToken } from '../middlewares/verificaToken.js'
  
const GamesRoutes = Router()

GamesRoutes.get("/game/:id", getGameId)
GamesRoutes.get("/games", verificaToken, getGames)
GamesRoutes.delete("/deleteGame/:id", deleteGameId)
GamesRoutes.post("/cadastroGame", schemaValidation(cadastroGameSchema), cadastroGame)

export default GamesRoutes