import express from 'express'
import { ProfileController } from '../controllers/profileController'

export function createProfileRoutes(profileController: ProfileController) {
  const profileRoutes = express.Router()

	profileRoutes.get('/userInfo', profileController.userInfo)
	profileRoutes.patch('/deleteUser/:id', profileController.deleteUser)
	profileRoutes.patch('/editUser', profileController.editUser)
	

	return profileRoutes;
}