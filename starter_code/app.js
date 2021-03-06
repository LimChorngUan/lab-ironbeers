const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', {
        beersArr: beers
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      console.log(beers[0])
      res.render('random-beer', {
        randomBeer: beers[0]
      });
    })
    .catch(error => {
      console.log(error)
    })
  
});

app.listen(3000);
