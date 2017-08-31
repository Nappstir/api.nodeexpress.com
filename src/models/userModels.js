import db from '../db';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export function getUser(req) {
  const id = req.params.id;
  return db.select().from('users').where('id', id).first();
}

export function getUserByEmail(req) {
  return db.select().from('users').where('email', req.body.email).first();
}

export function createUser(req) {
  console.log('createUser: ', req.body);
  let salt = bcrypt.genSaltSync(saltRounds);
  let hashedPassword = bcrypt.hashSync(req.body.password, salt);

  return db('users').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword
  })
    .then((id) => db('users').select().where('id', id).first());
}