import bcrypt from 'bcrypt';

export default function(password) {
  const saltRounds = 10;
  let salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}