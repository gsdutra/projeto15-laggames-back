import schemaValidation from "../middlewares/schemaValidationMiddleware.js";
import cadastroSchema from "../schema/cadastroSchema.js";
import { Router } from "express";
import { cadastro, login, logout} from "../controller/authController.js";

import loginSchema from "../schema/loginSchema.js";

const authRoutes = Router()

authRoutes.post('/cadastro', schemaValidation(cadastroSchema), cadastro)
authRoutes.post('/login', schemaValidation(loginSchema), login)
authRoutes.delete("/logout/:token", logout)

export default authRoutes