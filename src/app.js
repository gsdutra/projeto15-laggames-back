import cors from "cors"
import express from "express"
import gamesRoutes from "./routes/GamesRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const app = express()
const PORT = 5000
app.use(cors())
app.use(express.json())

app.use([gamesRoutes,authRoutes])

app.listen(PORT, () => {
    console.log('Servidor rodando!')
  })
