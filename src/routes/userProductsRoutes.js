import { Router } from 'express'
import { getUserProducts, postUserProducts } from '../controller/userProducts.js'
import { verificaToken } from '../middlewares/verificaToken.js'

const userProductsRoutes = Router()

userProductsRoutes.get("/userProducts", verificaToken, getUserProducts)
userProductsRoutes.post("/userProducts", verificaToken, postUserProducts)

export default userProductsRoutes