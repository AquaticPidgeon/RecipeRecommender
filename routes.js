const RecTable = require('./db/recModel.js');
const PopTable = require('./db/popularModel.js');
// gets the records from popular table
const getRecords = (callback) => {
  let recordsList;
  PopTable.fetchAll().then((records) => {
    recordsList = records.models;
    callback(recordsList);
  });
};


module.exports = function (app) {
  // endpoint for client to get recommendation for specific user
  app.post('/recommondation', (req, res) => {
  	let user = req.body.user;
  	RecTable.where('user_id', user).fetch().then((user) => {
  		res.status(200).send(user.attributes);
  	})
  });
  app.get('/popular', (req, res) => {
  // endpoint for client to get the popular recipes 
  	let results = []
  	getRecords((records) => {
  		records.forEach((record) => {
  			results.push(record.attributes.title)
  		})
  		res.status(200).send(results);
  	})
  });
};