import schemaValidation from "../middlewares/schemaValidationMiddleware.js";
import cadastroSchema from "../schema/cadastroSchema.js";
import { Router } from "express";
import { cadastro } from "../controller/authController.js";

const authRoutes = Router()

authRoutes.post('/cadastro', schemaValidation(cadastroSchema), cadastro)

export default authRoutes