import express from 'express'
import { ProfileController } from '../controllers/profileController'
import { isLogin } from '../middleware'

export function createProfileRoutes(profileController: ProfileController) {
  const profileRoutes = express.Router()

	profileRoutes.get('/userInfo',isLogin, profileController.userInfo)
	profileRoutes.patch('/deleteUser/:id',isLogin, profileController.deleteUser)
	profileRoutes.patch('/editUser',isLogin, profileController.editUser)
	

	return profileRoutes;
}