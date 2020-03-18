const db = require('../database/dbConfig.js');

const getByTimeblock = id => {
	return db('tasks').where({ timeblock_id: id })
}

const getById = id => {
	return db('tasks').where({ id }).first()
}

const insert = task => {
	return db('tasks').insert(task, 'id').then(id => {
		return getById(id[0])
	})
}

const update = (id, changes) => {
	return db('tasks').where({ id }).update(changes)
}

const remove = id => {
	return db('tasks').where({ id }).del()
}

module.exports = {
	getById, getByTimeblock, insert,
	update,
	remove
}