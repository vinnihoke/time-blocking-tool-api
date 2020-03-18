const db = require('../database/dbConfig.js');

const getByUser = id => {
	return db('timeblocks').where({ user_id: id })
}

const getById = id => {
	return db('timeblocks').where({ id })
}

const insert = timeblock => {
	return db('timeblocks').insert(timeblock, 'id')
}

const update = (id, changes) => {
	return db('timeblocks').where({ id }).update(changes)
}

const remove = id => {
	return db('timeblocks').where({ id }).del()
}

module.exports = {
	getById, getByUser, insert,
	update,
	remove
}