// -------------------------------------------------------------------------------------------------------------------
// imports (DO NOT EXPORT ANYTHING FORM App.ts)
// -------------------------------------------------------------------------------------------------------------------
import express from 'express'
import expressSession from 'express-session'
import { logger } from './logger'
import { isLogin } from './middleware'
import grant from 'grant'
import { client } from './db'
import dotenv from 'dotenv'
import { UserService } from './services/userService'
import { UserController } from './controllers/userController'
import { createUserRoutes } from './routes/userRoutes'
import { ProductService } from './services/productService'
import { ProductController } from './controllers/productController'
import { createProductRoutes } from './routes/productRoutes'
import Knex from "knex"
import { createProfileRoutes } from './routes/profileRoutes'
import { ProfileController } from './controllers/profileController'
import { ProfileService } from './services/profileService'
import { InvoiceController } from './controllers/invoiceController'
import { InvoiceService } from './services/invoiceService'
import { createInvoiceRoutes } from './routes/invoiceRoutes'
import cors from 'cors'


// -------------------------------------------------------------------------------------------------------------------
// Knex
// -------------------------------------------------------------------------------------------------------------------

dotenv.config()
const knexConfigs = require("./knexfile");
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

// -------------------------------------------------------------------------------------------------------------------
// main script
// -------------------------------------------------------------------------------------------------------------------
const app = express()

app.use(cors({
	origin:'http://localhost:3000',
	credentials: true
}))

const PORT = process.env.PORT || 8000

// session
app.use(
	expressSession({
		secret: process.env.EXPRESS_SESSION!,
		resave: false,
		saveUninitialized: true
	})
)

// //grant
const grantExpress = grant.express({
	defaults: {
		origin: 'http://localhost:8080',
		transport: 'session',
		state: true
	},
	google: {
		key: process.env.GOOGLE_CLIENT_ID || '',
		secret: process.env.GOOGLE_CLIENT_SECRET || '',
		scope: ['profile', 'email'],
		callback: '/login/google'
	}
})


app.use(grantExpress as express.RequestHandler)
// -------------------------------------------------------------------------------------------------------------------
// others
// -------------------------------------------------------------------------------------------------------------------

//connect to client
client.connect()

//urlencoded
app.use(express.urlencoded({ extended: true }))

//json
app.use(express.json())

//get HTML files from public, default images & uploads
app.use(express.static('public'))//get files from private
const userService = new UserService(knex)
const invoiceService = new InvoiceService(knex)
const productService = new ProductService(knex)

const profileService = new ProfileService(knex)
const userController = new UserController(userService, invoiceService)
app.use(isLogin, express.static('private'))	

app.use('/serverDefaultedImages', express.static('images'))
app.use('/userUploadedFiles', express.static('uploads'))

// get code from usersRoute



const profileController = new ProfileController(profileService)

const productController = new ProductController(productService)

const invoiceController = new InvoiceController(profileService, invoiceService, productService)

app.use(createUserRoutes(userController))
app.use(createProfileRoutes(profileController))
app.use(createProductRoutes(productController))
app.use(createInvoiceRoutes(invoiceController))

// --------------------------------------------------------------------------------------------------------------------
// Error 404
//---------------------------------------------------------------------------------------------------------------------

app.use((req, res) =>{
	res.status(404)
	res.send('404 Not Found')
})

// --------------------------------------------------------------------------------------------------------------------
// listening
//---------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
	logger.info(`listening on port ${PORT}`)
})

