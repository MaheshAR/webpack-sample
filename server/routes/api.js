const express = require('express');
const router = express.Router();
const db = require('../db').mongoConnection;
const authentication = require('../authentication').authentication;

router.post('/login', (req, res) => {
    new Promise((resolve, reject) => {
        resolve(authentication.login(req));
    })
        .then(data => {
			res.send({
				err: data.err,
				success: data.success,
				message: data.message,
				result: data.result
			});
		})
		.catch(err => {
			res.status(500).send({ 
				err: err,
				success: false
			});
	    });
});

module.exports = router;