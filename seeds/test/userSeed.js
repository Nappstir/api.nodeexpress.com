import hashPassword from '../../src/helpers/hashPassword';

exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(() => {
      return knex('users')
        .then(() => {
          return Promise.all([
            // Insert seed entries
            knex('users').insert([
              {
                first_name: 'admin',
                last_name: 'admin',
                email: 'admin@admin.com',
                password: hashPassword('test')
              },
              {
                first_name: 'test',
                last_name: 'test',
                email: 'test@test.com',
                password: hashPassword('test')
              }
            ]),
          ]);
        });
    })
};