const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true})); // New

app.use(express.json()); 

app.use(express.static('public'));

const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', 'hbs');

const routes = require('./server/routes/team');
app.use('/', routes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => console.log(`Listening on port ${port}`));