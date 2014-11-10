var basicAuth = require('basic-auth');
var express = require('express');
var app = express();

app.use('/assets', express.static(__dirname + '/app-components/target'));

app.listen(process.env.PORT || 3000);

//User authentication
var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.sendStatus(401);
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    }

    if (user.name === 'smurfs' && user.pass === 'Suborder.7') {
        return next();
    } else {
        return unauthorized(res);
    }
};

app.get('/', auth, function(req, res) {
    res.sendFile(__dirname + '/app-components/target/index.html');
});