// -------------------------------------------------------------------------------------------------------------------
// imports
// -------------------------------------------------------------------------------------------------------------------
import express from 'express'
import fs from 'fs'
import formidable from 'formidable'
import { knex } from "./knex";
import { Bearer } from 'permit'
import { uuid } from 'uuidv4';
import dotenv from "dotenv";
import './models'
// library for generating symmetric key for jwt

const { createSecretKey } = require('crypto');
// library for signing jwt
//const { SignJWT } = require('jose-node-cjs-runtime/jwt/sign');
import * as jose from 'jose'



dotenv.config();
const permit = new Bearer({ query: 'access_token' })
// -------------------------------------------------------------------------------------------------------------------



export const userMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

	const secretKey = createSecretKey(process.env.JWT_SECRET, 'utf-8');
	console.log(secretKey)
	const token = permit.check(req)
	try {
		const { payload } = await jose.jwtVerify(token, secretKey,
			{
				issuer: process.env.JWT_ISSUER!,
				audience: process.env.JWT_AUDIENCE!,
			})
		console.log(payload)

		req.user = {
			id: payload.userId as any,
		}

		next();

	} catch (e) {

		const newUser = await knex.insert({
			username: uuid(),
			password: '',
			email: '',
		}).into('user').returning('id')

		req.user = {
			id: newUser[0].id
		}

		const payload = {
			userId: newUser[0].id
		}

		const token = await new jose.SignJWT(payload) // details to  encode in the token
			.setProtectedHeader({ alg: 'HS256' }) // algorithm
			.setIssuedAt()
			.setIssuer(process.env.JWT_ISSUER!) // issuer
			.setAudience(process.env.JWT_AUDIENCE!) // audience
			.setExpirationTime(process.env.JWT_EXPIRATION_TIME!) // token expiration time, e.g., "1 day"
			.sign(secretKey); // secretKey generated from previous step

		console.log(token)

		res.header('X-C21-TOKEN', token);

		next()
	}
}


	// class User extends AdminGroup {

	// }

	// req.session["user"] = {
	// 	id: 1,

	// 	check(functionID) : boolean {

	// 	}
	// }

	// -------------------------------------------------------------------------------------------------------------------
	// check if the user is Admin
	// -------------------------------------------------------------------------------------------------------------------
	export const isAdmin = (roleId: number) => {
		if (roleId == 1) {
			return true
		} else {
			return false
		}
	}

	// -------------------------------------------------------------------------------------------------------------------
	// formidable (upload dir will be opened if it doesn't exist)
	// -------------------------------------------------------------------------------------------------------------------

	const uploadDir = 'uploads'
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync('uploads', { recursive: true })
	}

	export const form = formidable({
		uploadDir: uploadDir,
		keepExtensions: true,
		multiples: true,
		maxFiles: 1,
		maxFileSize: 20 * 1024 * 1024 ** 2, // 20MB
		filter: (part) => part.mimetype?.startsWith('image/') || false
	})