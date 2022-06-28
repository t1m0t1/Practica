const express = require('express');
const morgan = require('morgan');

const {engine} = require('express-handlebars');
const path = require('path');

const exphbs = require('express-handlebars');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const { database } = require('./js/keys');




const app = express();
require('./lib/passport');


//----------------------------------------configuraciones----------------------------------------//
app.set("port", process.env.PORT || 4000);


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
app.use(flash());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session);


//----------------------------------------variables globales----------------------------------------//

//----------------------------------------rutas----------------------------------------//
app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use(require('./routes/usuario'));


//----------------------------------------conexion----------------------------------------//
const conexion= require ('./js/conexion_slq');


//----------------------------------------publico----------------------------------------//

//----------------------------------------server----------------------------------------//
app.listen(app.get("port"), ()=>{
    console.log("server on", app.get("port"));
});



