
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'Vinni',
          email: 'vinni@email.com',
          provider: "email",
          password: "test",
          access_token: "test1234",
          refresh_token: "test1234",
        },
        {
          username: 'Not Vinni',
          email: 'not-vinni@email.com',
          provider: "email",
          password: "test",
          access_token: "test1234",
          refresh_token: "test1234",
        },
      ]);
    });
};
