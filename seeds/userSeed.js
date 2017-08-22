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
            password: '$2a$10$1L7hnXighot5g.jr1TmqLevySWgil2xlE3rwBEzR5OjOxvrK0i/Sy'
          },
          {
            first_name: 'test',
            last_name: 'test',
            email: 'test@test.com',
            password: 'testing'
          },
          {
            first_name: 'Travis',
            last_name: 'Siebenhaar',
            email: 'trsiebenhaar@gmail.com',
            password: 'testing'
          }
          ]),
      ]);
    });
};