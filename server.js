var app = require('./express');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require('./assignment/app')(app);

app.listen(process.env.PORT || 3000);
