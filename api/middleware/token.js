const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets.js');

const generateToken = user => {
	const payload = {
		subject: user.id,
		email: user.email
	};
	const options = {
		expiresIn: '1w'
	};
	return jwt.sign(payload, jwtSecret, options)
}

module.exports = generateToken