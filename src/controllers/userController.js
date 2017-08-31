import * as User from '../models/userModels';

export function getUser(req, res, next) {
  User.getUser(req)
    .then(user => {
      if (!user) {
        res.status(404).json({error: '404 Not found.'});
      }
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
}

export function loginUser(req, res, next) {
  User.getUserByEmail(req)
    .then(user => {
      if (!user) {
        res.sendStatus(404).json({error: '404 Not found.'})
      }
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
}

export function createUser(req, res, next) {
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