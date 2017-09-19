import * as User from '../models/userModels';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import crypto from 'crypto';
import config from '../config';
import sendMail from 'sendmail';

const sendmail = sendMail({
  logger: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  },
  silent: false,
});

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
  User.findOne({email: req.body.email})
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        generateToken(res, user);
      } else {
        res.status(401).json({
          success: false,
          message: 'Incorrect username or password.'
        });
      }
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

export function forgotPassword(req, res) {
  User.findOne({email: 'blah@blah.com'})
    .then(user => {

      if (user) {
        crypto.randomBytes(20, function(err, buffer) {
          let token = buffer.toString('hex');

          User.findByIdAndUpdate({id: user.id, body: { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }})
            .then(user => {

              sendmail({
                from: 'noreply@yourdomain.com',
                to: user.email,
                subject: 'App password reset.',
                html: 'Heyo',
              }, function(err, reply) {
                console.log(err && err.stack);
              });

            })
            .catch(err => {
              res.status(404).json({error: 'User id not found.'});
            })
        })
      } else {
        res.status(404).json({error: 'User not found.'});
      }
    })

}