import { Router } from 'express'
import { getUserProducts, postUserProducts } from '../controller/userProducts.js'

const userProductsRoutes = Router()

userProductsRoutes.get("/userProducts", getUserProducts)
userProductsRoutes.post("/userProducts", postUserProducts)

export default userProductsRoutes