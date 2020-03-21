const router = require('express').Router();
const purecrypt = require('purecrypt');
const { generateToken } = require('../api/middleware/token.js');
const Timeblock = require('../models/timeblock-model.js');

// TODO These require authorization.

router.get('/:id', async (req, res) => {
	try {
		const request = await Timeblock.getByUser(req.params.id)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.get('/:id/:timeblock', async (req, res) => {
	try {
		const request = await Timeblock.getById(req.params.timeblock)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.post('/:id', async (req, res) => {
	req.body.user_id = req.params.id
	try {
		const request = await Timeblock.insert(req.body)
		// const request = await Timeblock.getById(req.params.id)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.put('/:id/:timeblock', async (req, res) => {
	try {
		const request = await Timeblock.update(req.params.timeblock, req.body)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.delete('/:id/:timeblock', async (req, res) => {
	try {
		const removed = await Timeblock.getById(req.params.timeblock);
		await Timeblock.remove(req.params.timeblock)
		res.status(200).json(removed)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

module.exports = router