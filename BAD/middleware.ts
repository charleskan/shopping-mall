// -------------------------------------------------------------------------------------------------------------------
// imports
// -------------------------------------------------------------------------------------------------------------------
import express from 'express'
import fs from 'fs'
import formidable from 'formidable'

// -------------------------------------------------------------------------------------------------------------------
// check if the user is login or not
// -------------------------------------------------------------------------------------------------------------------
export const isLogin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session['isLogin'] = true) {
		next()
	} else {
		res.redirect('/')
		// next()
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