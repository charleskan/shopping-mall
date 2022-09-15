import express from 'express'
import { logger } from '../logger'
import dotenv from "dotenv";
import {
	UserDuplicateEmailError,
	UserDuplicateUsernameError,
	UserMissingRegisterInfoError,
	UserNotExistError,
	UserPasswordMissMatchError,
	UserService,
	UserStatusError
} from '../services/userService'
import { InvoiceService } from '../services/invoiceService'
import { createSecretKey } from 'node:crypto';
import * as jose from 'jose'

dotenv.config();
export class UserController {
	constructor(
		private userService: UserService,
		private invoiceService: InvoiceService
	) { }

	loginGoogle = async (req: express.Request, res: express.Response) => {
		const accessToken = req.session?.['grant'].response.access_token
		const [user, username] = await this.userService.loginGoogle(accessToken)

		if (req.session) {
			req.session['isLogin'] = true
			req.session['user'] = user
			res.json({ result: true, msg: 'google login success' })
			logger.info(`${username} logged in`)
			return
		}
		return res.json({ result: false, msg: 'google login error' })
	}

	register = async (req: express.Request, res: express.Response) => {
		try {
			console.log("body:", req.body);

			let username = req.body.username?.trim()
			let password = req.body.password?.trim()
			let email = req.body.email?.trim()
			let nickname = req.body.nickname?.trim()

			let role_id = 2
			let status_id = 1

			await this.userService.register(
				username,
				password,
				email,
				nickname,
				role_id,
				status_id
			)
			return res.json({ result: true, msg: 'register success' })
		} catch (err) {
			if (err instanceof UserDuplicateUsernameError) {
				return res
					.status(500)
					.json({ result: false, msg: 'username already exists' })
			}

			if (err instanceof UserDuplicateEmailError) {
				return res
					.status(500)
					.json({ result: false, msg: 'email already exists' })
			}

			if (err instanceof UserMissingRegisterInfoError) {
				return res
					.status(500)
					.json({ result: false, msg: 'missing register info' })
			}

			logger.error(err)
			res.status(500).json({ result: false, msg: 'register error' })

			return //ask tutor about this
		}
	}

	login = async (req: express.Request, res: express.Response) => {
		try {
			const secretKey = createSecretKey(process.env.JWT_SECRET!, 'utf-8');
			
			let username = req.body.username.trim()
			let password = req.body.password.trim()

			let user = await this.userService.login(username, password)

			const payload = {
				userId: user[0].id,
			}
			const token = await new jose.SignJWT(payload) // details to  encode in the token
				.setProtectedHeader({ alg: 'HS256' }) // algorithm
				.setIssuedAt()
				.setIssuer(process.env.JWT_ISSUER!) // issuer
				.setAudience(process.env.JWT_AUDIENCE!) // audience
				.setExpirationTime(process.env.JWT_EXPIRATION_TIME!) // token expiration time, e.g., "1 day"
				.sign(secretKey); // secretKey generated from previous step

			// console.log(token)
			//jwt header
			res.header('X-C21-TOKEN', token);

			let invoice = await this.invoiceService.getInvoiceDetailByUserId(
				user[0].id
			) //test after create invoice is done

			// also check if the user has invoice
			// if (invoice != null) {
			// 	req.session['Invoice'] = invoice[0]
			// }

			res.json({
				result: true,
				msg: 'login success',
				user: user[0],
				invoice: invoice[0] != null ? invoice[0] : null,
				// token:jwt
				// //jwt session

				// token: jwtSimple.encode({
				// }, process.env.JWT_SECRET!)
			})
			logger.info(`${username} logged in`)
			return
		} catch (err) {
			if (err instanceof UserNotExistError) {
				return res
					.status(500)
					.json({ result: false, msg: 'username not exist' })
			}

			if (err instanceof UserPasswordMissMatchError) {
				return res
					.status(500)
					.json({ result: false, msg: 'password miss match' })
			}

			if (err instanceof UserStatusError) {
				return res
					.status(500)
					.json({ result: false, msg: 'The user is not active' })
			}

			logger.error(err)
			res.status(500).json({ result: false, msg: 'login error' })
			return //ask tutor about this
		}
	}

	logout = async (req: express.Request, res: express.Response) => {
		try {
			req.session['isLogin'] = false
			res.json({ result: true, msg: 'logout success' })
			logger.info(`${req.session['user'].username} logged out`)
		} catch (err) {
			logger.error(err)
			res.status(500).json({ result: false, msg: 'logout Error' })
			return
		}
	}
}
