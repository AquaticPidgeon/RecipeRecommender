
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'recommender',
    charset: 'utf8',
    },	
});
const db = require('bookshelf')(knex);
db.knex.schema.hasTable('recTable').then((exists) => {
  if(!exists) {
		db.knex.schema.createTable('recTable', (recs) => {
      recs.increments('id').primary();			
			recs.integer('user_id');
      recs.string('first', 200);
      recs.string('second', 200);
      recs.string('third', 200);
      recs.string('fourth', 200);
      recs.timestamps();
		}).then((table) => {
			console.log('Created table recTable');
		});
	};
});

db.knex.schema.hasTable('popularTable').then((exists) => {
  if(!exists) {
    db.knex.schema.createTable('popularTable', (pops) => {
      pops.increments('id').primary();      
      pops.string('title', 300);
      pops.integer('count', 200);
      pops.timestamps();
    }).then((table) => {
      console.log('Created table popularTable');
    });
  };
});


module.exports = db;