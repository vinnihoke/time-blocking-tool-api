
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          title: 'Fold the laundry',
          status: "Completed",
          timeblock_id: 1,
        },
        {
          title: 'Swiffer the floor',
          status: "In Progress",
          timeblock_id: 1,
        },
        {
          title: 'Vacuum rugs',
          status: "Completed",
          timeblock_id: 1,
        },
        {
          title: 'Finish the back-end for Time-blocking',
          description: "Left off working on the seeds",
          status: "In Progress",
          timeblock_id: 2,
        },
        {
          title: 'Add features to Purecrypt',
          description: "Look into salting and possibly preventing cloud attacks",
          status: "Not Completed",
          timeblock_id: 2,
        },
        {
          title: 'Finish up careers assignments',
          status: "Not Completed",
          timeblock_id: 3,
        },
        {
          title: 'Follow up with team',
          status: "Not Completed",
          timeblock_id: 3,
        },
        {
          title: 'Complete users section',
          description: "Currently the adult portion is operational, but the children table isn't working.",
          status: "Not Completed",
          timeblock_id: 3,
        },
      ]);
    });
};
