const express = require("express");
const app = express();
// const db = require("./models");
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const session = require('express-session');
const initRoutes = require("./controllers/web");
const path = require('path');
const routes = require('./controllers/');
const helpers = require('./utils/helper');
const hbs = exphbs.create({ helpers });

global.__basedir = __dirname;

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'I dont know... Kangaroos cant hop backwards?',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.urlencoded({ extended: true }));
// initRoutes(app);


const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});