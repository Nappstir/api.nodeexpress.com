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
  silent: false
});

function generateToken(res, user) {
  const token = jwt.sign({
    user
  }, config.jwtSecret, {
    expiresIn: '1d'
  });
  return res.status(200).json({
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
    .catch(err => {
      res.status(401).json({
        success: false,
        message: 'User cannot be found.'
      });
      throw(err);
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
    .catch(err => {
      res.json(err);
      throw(err);
    });
}

export function forgotPassword(req, res) {
  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        crypto.randomBytes(20, function(err, buffer) {
          let token = buffer.toString('hex');

          User.findByIdAndUpdate({
            id: user.id,
            body: {
              reset_password_token: token,
              reset_password_expires: Date.now() + 86400000
            }
          })
            .then(user => {
              sendmail({
                from: 'noreply@yourdomain.com',
                to: user.email,
                subject: 'App password reset.',
                html: 'You are receiving this because you (or someone else) has requested the reset of the password for your account<br><br>' +
                'Please click on the following link, or paste this into your browser to complete reset your password:<br><br>' +
                'http://' + req.headers.host + '/resetPassword?token=' + user.reset_password_token + '<br><br>' +
                'If you did not request this, please ignore this emai and your password will remain unchanged.',
              }, function(err, reply) {
                console.log(err && err.stack);
              });

              res.status(200).json({
                success: true,
                message: 'A password reset link has been sent to your email.'
              })

            })
            .catch(err => {
              res.status(404).json({error: 'User id not found.'});
              throw(err);
            })
        })
      } else {
        res.status(404).json({error: 'User not found.'});
      }
    })

}

export function resetPassword(req, res) {
  User.findOne({reset_password_token: req.body.reset_password_token})
    .then(user => {
      if (user && user.reset_password_expires > Date.now()) {
        User.findByIdAndUpdate({
          id: user.id,
          body: {
            reset_password_token: undefined,
            reset_password_expires: undefined,
            password: req.body.password
          }
        })
          .then(user => {
            res.status(200).json({
              success: true,
              message: `Password for ${user.first_name} has been reset.`
            });
          })
          .catch(err => {
            res.status(404).json({error: 'User not found.'});
            throw(err);
          })
      } else {
        res.status(404).json({error: 'Password reset token has expired.'});
      }
    })
    .catch(err => {
      res.status(404).json({error: 'User not found.'});
      throw(err);
    })
}