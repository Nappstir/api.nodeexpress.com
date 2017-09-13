import express from 'express';
import userRoute from './userRoute';
import authRoute from './authRoute';
import config from '../config';
import jwt from 'jsonwebtoken';

const router = express.Router();

function verifyToken(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.jwtSecret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    })
  }
}

router.use('/auth', authRoute);

// router.use(function(req, res, next) {
//   verifyToken(req, res, next);
// });

router.use('/users', function(req, res, next) {verifyToken(req, res, next)}, userRoute);

export default router;