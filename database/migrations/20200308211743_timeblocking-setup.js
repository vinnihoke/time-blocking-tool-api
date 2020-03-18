
exports.up = function (knex) {
	return knex.schema
		.createTable('users', col => {
			col.increments();
			col.text('username', 40).notNullable
			col.text('email').notNullable()
			col.text('password')
			col.text('provider')
			col.text('access_token')
			col.text('refresh_token')
		})
		.createTable('timeblocks', col => {
			col.increments()
			col.text('title').notNullable()
			col.text('description')
			col.bigint('start')
			col.bigint('end')
			col.integer('user_id')
				.unsigned()
				.references('users.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('tasks', col => {
			col.increments()
			col.text('title').notNullable()
			col.text('description')
			col.text('status').notNullable()
			col.integer('timeblock_id')
				.unsigned()
				.references('timeblocks.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('tasks')
		.dropTableIfExists('timeblocks')
		.dropTableIfExists('users')
};
