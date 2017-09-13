import * as User from '../models/userModels';
import jwt from 'jsonwebtoken';
import config from '../config';

function generateToken(res, user) {
  const token = jwt.sign({
    user
  }, config.jwtSecret, {
    expiresIn: '1d'
  });

  return res.json({
    success: true,
    message: 'Login successful!',
    token: token
  });
}

export function login(req, res) {
  User.getUserByEmail(req)
    .then(user => {
      generateToken(res, user);
    })
    .catch(error => {
      res.json(error);
    });
}

export function register(req, res) {
  User.createUser(req)
    .then(user => {
      if (!user) {
        res.sendStatus(400).json({error: '400 Bad request.'});
      }
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
}