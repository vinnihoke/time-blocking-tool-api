
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('timeblocks').del()
    .then(function () {
      // Inserts seed entries
      return knex('timeblocks').insert([
        {
          title: '🧹 Chores',
          description: 'Weekly chores.',
          start: 1318781876406,
          end: 1318781876406,
          user_id: 1,
        },
        {
          title: '👩‍💻 Coding',
          description: 'Projects that need to be completed.',
          start: 1318781876406,
          end: 1318781876406,
          user_id: 1,
        },
        {
          title: '📚 School',
          description: 'Homeword, todos, and more!',
          start: 1318781876406,
          end: 1318781876406,
          user_id: 1,
        },
      ]);
    });
};
