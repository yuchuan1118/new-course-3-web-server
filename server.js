const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('ScreamIt', (text) => {
  return text.toUpperCase();
});


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}\n`;
  console.log(log);
  fs.appendFile('server.log', log, (err) => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  // res.send('Home page');
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'welcome to the website.',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    currentYear: new Date().getFullYear()
  })
});

app.get('/bad', (req, res) => {
  res.send({
    error: '404 Error'
  });
});

app.listen(4000, () => {
  console.log('server is up on port 4000');
});
