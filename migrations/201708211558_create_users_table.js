exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(false, true);
  }).then(() => {
    console.log('Users Table is Created!');
  })
};

exports.down = function(knex, Promies) {
  return knex.schema.dropTable('users')
    .then(() => {
      console.log('Users Table has been Dropped!');
    })
};