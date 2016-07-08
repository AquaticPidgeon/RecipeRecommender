const db = require('./schema.js');

const RecTable = db.Model.extend({
  tableName: 'recTable',
  hasTimestamps: true,
});

module.exports = RecTable;