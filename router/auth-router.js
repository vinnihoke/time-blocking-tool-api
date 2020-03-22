require('dotenv').config()
const router = require('express').Router();
const purecrypt = require('purecrypt');
const generateToken = require('../api/middleware/token.js');
const restricted = require('../api/middleware/restricted.js');
const Auth = require('../models/auth-model.js');

router.get('/oauth', async (req, res) => {

	const user = {
		username: req.session.grant.response.id_token.payload.email,
		email: req.session.grant.response.id_token.payload.email,
		provider: req.session.grant.provider,
		access_token: purecrypt.encrypt(req.session.grant.response.access_token),
		refresh_token: purecrypt.encrypt(req.session.grant.response.refresh_token),
	}

	try {
		const current = await Auth.getByEmail(user.email)
		if (current) {
			try {
				const token = await generateToken(current);
				res.redirect(`${process.env.FE_URL}/auth/${token}`)
			} catch (e) {
				res.status(500).json({ line: "25", error: e.message });
			}
		} else {
			try {
				const newUser = await Auth.insert(user)
				const token = await generateToken(newUser);
				res.redirect(`${process.env.FE_URL}/auth/${token}`)
			} catch (e) {
				res.status(500).json({ line: "34", error: e.message });
			}
		}
	} catch (e) {
		res.status(500).json({ line: "38", error: e.message });
	}
})

router.post('/login', restricted, async (req, res) => {
	try {
		const request = await Auth.getByEmail(req.decodedToken.email)
		res.status(200).json({ message: "Auth-router line 43", request })
	} catch (e) {
		console.log(e.message)
	}
})

router.get('/', async (req, res) => {
	try {
		const request = await Auth.get()
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.get('/:id', async (req, res) => {
	try {
		const request = await Auth.getById(req.params.id)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})
router.post('/', async (req, res) => {
	try {
		const request = await Auth.insert(req.body)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})
router.put('/:id', async (req, res) => {
	try {
		const request = await Auth.update(req.params.id, req.body)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})
router.delete('/:id', async (req, res) => {
	try {
		const request = await Auth.remove(req.params.id)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

module.exports = router