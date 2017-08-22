import db from '../db';

export function getUser(req) {
  const id = req.params.id;
  return db.select().from('users').where('id', id).first();
}