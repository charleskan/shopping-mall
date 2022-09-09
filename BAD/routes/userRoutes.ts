import express from 'express'
import { UserController } from '../controllers/userController'

export function createUserRoutes(userController: UserController) {
  const userRoutes = express.Router()

	userRoutes.get('/login/google', userController.loginGoogle)
	userRoutes.post('/register', userController.register)
	userRoutes.post('/login', userController.login)
	userRoutes.post('/logout', userController.logout)
	// userRoutes.post('/forgot', userController.forgot)

	return userRoutes;
}