const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.set('port', process.env.PORT || 3500);


app.listen(app.get('port'), () => {
  console.log(`Express server started in ${app.get('env')} mode on port ${app.get('port')}`);
});

module.exports = app;
