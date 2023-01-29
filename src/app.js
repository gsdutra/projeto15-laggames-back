import cors from "cors"
import express from "express"
import gamesRoutes from "./routes/GamesRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import userProductsRoutes from "./routes/userProductsRoutes.js"

const app = express()
const PORT = 5000
app.use(express.json())
app.use(cors())

app.use([gamesRoutes, authRoutes, userProductsRoutes])

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta '+ PORT)
  })
