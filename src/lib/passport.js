const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const conexion  = require ('../js/conexion_slq');
const bodyParser = require('body-parser');
const helpers = require('../lib/helpers');

/* Ingreso */
passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await conexion.query('SELECT * FROM usuario WHERE username = ?', [username]);

  if (rows.length > 0) {
    const user = rows[0];

    const validPassword = await helpers.matchPassword(password, user.password)
    
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.username));
    } else {

      done(null, false, req.flash('message', 'Usuario/contraseÑa incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'Usuario contraseÑa incorrecta'));
  }
}));


/* Registro */
passport.use('local.signup', new LocalStrategy({
  usernameField:'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

//----------------------------------------Creacion de una sesion----------------------------------------//
  let newUser = {
    username,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    area: req.body.area,
    password,
    rol: req.body.rol
  };


  newUser.password = await helpers.encryptPassword(password);
  
  // Saving in the Database
  const result = await conexion.query('INSERT INTO usuario SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(async (id, done) => {
  const rows = await conexion.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
  done(null, rows[0]);
});
module.exports = passport;