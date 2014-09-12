'use strict';

var express = require('express');
var app = express();
 
app.use('/assets', express.static(__dirname + '/app-components/target'));

app.listen(process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.sendfile('./app-components/target/index.html');
});