var express = require('express');
var app = express();
 
app.use('/assets', express.static(__dirname + '/app-components/target'));

app.listen(process.env.PORT || 3000);

app.get('/pod6', function(req, res) {
    res.sendFile(__dirname + '/app-components/target/index.html');
});