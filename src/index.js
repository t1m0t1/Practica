const express = require('express');
const morgan = require('morgan');

const {engine} = require('express-handlebars');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const validator = require('express-validator');
const bodyParser = require('body-parser');

const flash = require('connect-flash');
const { database } = require('./js/keys');
const passport = require('passport');



const app = express();
app.use(express.json());
require('./lib/passport');

/* app.use(express.urlencoded()); */


//----------------------------------------configuraciones----------------------------------------//
app.set("port", process.env.PORT || 4000);
//----------------------------------------publico----------------------------------------//
app.use(express.static(path.join(__dirname, 'public')));

//----------------------------------------motor de plantillas----------------------------------------//
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers')
  }))
app.set('view engine', '.hbs');

//----------------------------------------Middlewares----------------------------------------//
app.use(session({
  secret: 'faztmysqlnodemysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());




//----------------------------------------variables globales----------------------------------------//
app.use((req, res, next) => {
  app.locals.message = req.flash('message');
  app.locals.success = req.flash('success');
  app.locals.user = req.user;
  next();
});
//----------------------------------------rutas----------------------------------------//
app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));



//----------------------------------------conexion----------------------------------------//
const conexion= require ('./js/conexion_slq');



//----------------------------------------server----------------------------------------//
app.listen(app.get("port"), ()=>{
    console.log("server on", app.get("port"));
});



