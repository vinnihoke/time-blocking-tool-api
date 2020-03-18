const db = require('../database/dbConfig.js');

const get = () => {
	return db('users')
}

const getById = id => {
	return db('users').where({ id })
}

const getByEmail = email => {
	return db('users').where({ email }).first()
}

const insert = user => {
	return db('users').insert(user, 'id').then(id => {
		return getById(id[0])
	})
}

const update = (id, changes) => {
	return db('users').where({ id }).update(changes)
}

const remove = id => {
	return db('users').where({ id }).del()
}

module.exports = {
	get, getByEmail, getById, insert, update, remove
}