import * as User from '../models/userModels';

export function getUser(req, res, next) {
  User.getUser(req)
    .then(user => {
      if (!user) {
        res.status(404).json({error: 'Unauthorized access.'});
      }
      res.json(user);
    })
    .catch(error => {
      res.json({error})
    });
}