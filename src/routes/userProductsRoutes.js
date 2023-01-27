import { Router } from 'express'
import { getUserProducts } from '../controller/getUserProducts.js'

const userProductsRoutes = Router()

userProductsRoutes.get("/userProducts", getUserProducts)

export default userProductsRoutes