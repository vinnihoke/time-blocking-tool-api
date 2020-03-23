const jwt = require('jsonwebtoken');
const secrets = require('./secrets.js');

const restricted = (req, res, next) => {
	const token = req.headers.authorization;
	console.log("Token from restricted middleware", token)
	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				console.log(err)
				res.status(401).end()
			} else {
				req.decodedToken = decodedToken;
				console.log("decodedToken", decodedToken)
				next();
			}
		})
	} else {
		res.status(403).end()
	}
}

module.exports = restricted