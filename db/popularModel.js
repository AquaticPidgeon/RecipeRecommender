const db = require('./schema.js');

const PopTable = db.Model.extend({
  tableName: 'popularTable',
  hasTimestamps: true,
});

module.exports = PopTable;