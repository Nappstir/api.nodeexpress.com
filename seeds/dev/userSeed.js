exports.seed = function(knex, Promise) {
  return knex('users')
    .then(function() {
      return Promise.all([
        // Insert seed entries
        knex('users').insert([
          {
            first_name: 'admin',
            last_name: 'admin',
            email: 'admin@admin.com',
            password: 'test'
          },
          {
            first_name: 'test',
            last_name: 'test',
            email: 'test@test.com',
            password: 'test'
          }
          ]),
      ]);
    });
};