import * as User from '../models/userModels';

export function getUser(req, res) {
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
