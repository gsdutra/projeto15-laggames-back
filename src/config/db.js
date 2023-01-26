import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/laggames")
let db;

try {
  await mongoClient.connect()
  db = mongoClient.db()
  console.log('Banco conectado!')
} catch (error) {
  console.log('Erro no server')
}

export default db