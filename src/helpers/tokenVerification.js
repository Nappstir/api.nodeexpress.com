import config from '../config';
import jwt from 'jsonwebtoken';

export default function(req, res, next) {
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
};