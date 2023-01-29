import { Router } from 'express'
import { getUserProducts, postUserProducts, deleteUserProducts, putUserProducts } from '../controller/userProducts.js'
import { verificaToken } from '../middlewares/verificaToken.js'

const userProductsRoutes = Router()

userProductsRoutes.get("/userProducts", verificaToken, getUserProducts)
userProductsRoutes.post("/userProducts", verificaToken, postUserProducts)
userProductsRoutes.delete("/userProducts/:productId", verificaToken, deleteUserProducts)
userProductsRoutes.put("/userProducts/:productId", verificaToken, putUserProducts)

export default userProductsRoutes