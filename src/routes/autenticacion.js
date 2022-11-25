const express= require('express');
const router = express.Router();


const {body,validationResult}= require('express-validator');
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');



// SIGNIN
router.get('/', (req, res) => {
  res.render('aut/login');
});

router.post('/', passport.authenticate('local.signin', {
  successRedirect: '/inicio',
  failureRedirect: '/',
  failureFlash: true
}));

// SINGUP
router.get('/user/usuarioAlta', (req, res) => {
  if(req.user.rol == 1){

    res.render('admin/usuarioAlta');
  }else{
    res.redirect('back')
  }

});



router.post('/user/usuarioAlta',
[
  body('nombre', 'Ingrese un nombre')
      .exists()
      .isLength({min:5}),
  body('apellido', 'Ingrese un apellido')
      .exists()
      .isLength({min:5}),
  body('area', 'Ingrese un area por favor')
      .exists(),
  body('username', 'Ingrese su usuario ')
      .exists()
      .isNumeric(),
  body('password', 'Ingrese una contraseña')        
      .exists()
      .isLength({min:5}),
],
(req, res, next) => {

/*   const data= {username:req.body.username,
    nombre:req.body.nombre,
    apellido:req.body.apellido,
    area:req.body.area,
    password:req.body.password}; */

  passport.authenticate('local.signup', {
    successRedirect: '/inicio',
    failureRedirect: 'usuarioAlta',
    failureFlash: true
  })(req, res, next);

});

/* router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
}); */
router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/inicio', isLoggedIn , (req, res) => {
  res.render('inicio');
});

module.exports = router;

