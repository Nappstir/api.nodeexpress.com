import db from '../db';
import hashPassword from '../helpers/hashPassword';

const saltRounds = 10;

export function getUser(req) {
  const id = req.params.id;
  return db('users').select().where('id', id).first();
}

export function findOne(req) {
  return db('users').select().where(req).first();
}

export function createUser(req) {
  return db('users').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashPassword(req.body.password)
  })
    .then((id) => db('users').select().where('id', id).first());
}

export function findByIdAndUpdate(req) {
  return db('users').select().where('id', req.id).first().modify(function(queryBuilder){
    if (req.body.password) {
      req.body.password = hashPassword(req.body.password);

      queryBuilder.update(req.body);
    } else {
      queryBuilder.update(req.body);
    }
  })
    .then(() => db('users').select().where('id', req.id).first());
}