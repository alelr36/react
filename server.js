'use strict';

var express = require('express');
var app = express();
 
app.listen(3000);

app.get('/view', function(req, res) {
    res.sendfile('./app-components/src/index.html');
});