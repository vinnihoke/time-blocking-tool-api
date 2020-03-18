const router = require('express').Router();
const purecrypt = require('purecrypt');
const { generateToken } = require('../api/middleware/token.js');
const Tasks = require('../models/tasks-model.js');

// TODO These require authorization.

router.get('/:timeblock', async (req, res) => {
	try {
		const request = await Tasks.getByTimeblock(req.params.timeblock)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.get('/:timeblock/:task', async (req, res) => {
	try {
		const request = await Tasks.getById(req.params.task)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.post('/:timeblock', async (req, res) => {
	req.body.timeblock_id = req.params.timeblock
	console.log(req.body)
	try {
		const request = await Tasks.insert(req.body)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.put('/:timeblock/:task', async (req, res) => {
	try {
		await Tasks.update(req.params.task, req.body)
		const request = await Tasks.getById(req.params.task)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

router.delete('/:timeblock/:task', async (req, res) => {
	try {
		const request = await Tasks.remove(req.params.timeblock)
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
})

module.exports = router