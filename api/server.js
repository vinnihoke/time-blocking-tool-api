require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const grant = require('grant-express');

const authRouter = require('../router/auth-router.js');
const timeblockRouter = require('../router/timeblock-router.js');
const tasksRouter = require('../router/tasks-router.js');

const api = express();

api.use(helmet());
api.use(morgan('dev'));
api.use(express.json());
api.use(cors());

api.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: true
}))
api.use(
	grant({
		defaults: {
			protocol: process.env.OAUTH_PROTOCOL,
			host: process.env.OAUTH_URL,
			transport: "session",
			state: true
		},
		google: {
			key: process.env.G_CLIENT_ID,
			secret: process.env.G_CLIENT_SECRET,
			scope: [
				"openid",
				"profile",
				"email"
			],
			nonce: true,
			custom_params: { access_type: 'offline' },
			callback: '/auth/oauth'
		}
	})
)

api.use('/auth', authRouter);
api.use('/timeblocks', timeblockRouter);
api.use('/tasks', tasksRouter);

api.get('/', (req, res) => {
	res.sendStatus(200)
})

module.exports = api;