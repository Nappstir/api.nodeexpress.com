import * as User from '../models/userModels';

export function getUser(req, res, next) {
  User.getUser(req)
    .then(user => {
      res.json(user);
    });
}