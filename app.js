var express = require('express');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 8080));

//Public files
app.use(express.static('public'));
app.use(express.static('public/images'));
app.use(express.static('carousel'));
//node_modules
app.use(express.static('node_modules'));
//node_modules
app.use(express.static('bower_components'));

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.get('/api/carousel', function (req, res) {
  const carouselFolder = 'carousel/';
  var categories = fs.readdirSync(carouselFolder);
  res.send({result: categories});
});

app.get('/api/carousel/:folder', function (req, res) {
  var images = fs.readdirSync('carousel/'+req.params.folder);
  res.send({result: images});
});

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/public/index.html', { root: __dirname });
});

app.listen(app.get('port'));

console.log('Servidor iniciado');
