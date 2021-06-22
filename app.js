const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// ...




// Add the route handlers here:

app.get('/', (req, res) => {

  res.render('index');
});



// !!!!!------esta formula nao é muito usada-----!!!!!/////
// app.get('/beers', (req, res) => {
//   punkAPI.getBeers().then(beersFromTheAPI => {
//     res.render('beers', { beersFromTheAPI });
//   });
// });

// é melhor usar esta
app.get('/beers', async (req, res) => {
  let beersFromTheAPI = await punkAPI.getBeers();
  console.log(beersFromTheAPI);
  res.render('beers', { beersFromTheAPI });
});


app.get('/random-beers', async (req, res) => {
  punkAPI.getRandom()
  .then(beersFromTheAPI => {
    res.render('random-beer', {beersFromTheAPI}); 
  })
  .catch(error => console.log(error));

});


app.listen(5000, () => console.log('🏃‍ on port 5000'));
