// -------------------------------------------------------------------------------------------------------------------
// imports
// -------------------------------------------------------------------------------------------------------------------
import express from 'express'
import fs from 'fs'
import formidable from 'formidable'
import {knex} from "./knex";
import jwtSimple from 'jwt-simple';
import { Bearer } from 'permit'
import { uuid } from 'uuidv4';
import dotenv from "dotenv";

dotenv.config();
const permit = new Bearer({query: 'access_token'})
// -------------------------------------------------------------------------------------------------------------------
// check if the user is login or not
// -------------------------------------------------------------------------------------------------------------------
export const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
  ) => {
	const token = permit.check(req);
  
	try {
	  const payload = jwtSimple.decode(token, process.env.JWT_SECRET!); //認真版換左佢就得
  
	  if (payload["userId"]) {
		req.user = {
		  id: payload["userId"],
		};
  
		next();
	  } else {
		res.status(401).json({ result: "unauthorized" });
	  }
	} catch (e) {
	  res.status(401).json({ result: "incorrect_token" });
	}
  };




export const userMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const token = permit.check(req)
	try {
	  const payload = jwtSimple.decode(token, process.env.JWT_SECRET!)
  
	  req.user = {
		id: payload.userId
	  };
  
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
  
	  const jwt = jwtSimple.encode(payload, process.env.JWT_SECRET!);
	  res.header('X-C21-TOKEN', jwt);
	  console.log(jwt)
	  next();
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