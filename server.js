var express = require('express');
var morgan = require('morgan');
var path = require("path");
var assert = require('assert');
var bodyParser = require('body-parser');

var app = express();

app.use('/public', express.static(__dirname + '/public'));
app.get("/public/Reflect.js", function(request, response)
{
    response.sendFile(path.join(__dirname, "node_modules", "reflect-metadata", "Reflect.js"));
});
app.get("/public/zone.js", function(request, response)
{
    response.sendFile(path.join(__dirname,"node_modules", "zone.js", "dist", "zone.js"));
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.set('port', (process.env.PORT || 8000));
app.get("/api/guild-activity", function(request, response)
{
    setTimeout(function() {
        response.json([]);
    }, 5000);
});
app.post("/api/account/sign-in", function(request, response)
{
    setTimeout(function() {
        response.statusCode = 500;
        response.json([]);
    }, 5000);
});
app.post("/api/account/register", function(request, response)
{
    setTimeout(function() {
        response.statusCode = 500;
        response.json([]);
    }, 5000);
});

//For avoidong Heroku $PORT error
app.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, "public", "index.html"));
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});