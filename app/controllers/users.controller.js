const User = require('../models').Users;

module.exports = {
    userAuthentication(req, res) {
        User
            .find({
                where: {
                    username: req.body.username
                }
            })
            .then((user) => {
                if (!user) {
                    return res.status(401).send({
                        message: 'Authentication failed. User not found.',
                    });
                }
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 86400 * 30 });
                        jwt.verify(token, 'nodeauthsecret', function (err, data) {
                            console.log(err, data);
                        })
                        res.json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                })
            })
            .catch((error) => res.status(400).send(error));
    },

    userRegister(req, res) {
        console.log(req.body);
        if (!req.body.username || !req.body.password) {
            res.status(400).send({ msg: 'Please pass username and password.' })
        } else {
            User
                .create({
                    username: req.body.username,
                    password: req.body.password
                })
                .then((user) => res.status(201).send(user))
                .catch((error) => {
                    console.log(error);
                    res.status(400).send(error);
                });
        }
    }
};