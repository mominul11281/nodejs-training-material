const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../utils/httpStatus');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');

class authController {
    async signup(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }
            const name = req.body.name;
            const email = req.body.email;
            const password = await bcrypt.hash(req.body.password, 10);
            const user = new User({ name, email, password });
            await user.save();

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            };
            const jwtToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            const resData = {
                access_token: jwtToken,
                ...userData
            }

            return res.status(HTTP_STATUS.OK).send(success('User is created successfully!', resData));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async signin(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
            }

            const user = await User.findOne({ email: req.body.email }).exec();
            if (!user) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure('Unauthorized user login'));
            }
            const passMatch = await bcrypt.compare(req.body.password, user.password);

            if (!passMatch) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).send(failure('Unauthorized user login'));
            }

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            };
            const jwtToken = jwt.sign(userData, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            const resData = {
                access_token: jwtToken,
                ...userData
            }

            return res.status(HTTP_STATUS.OK).send(success('Signed in successfully!', resData));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // async refreshToken(req, res, next) {
    //     // assignment
    // }
}

module.exports = new authController();
