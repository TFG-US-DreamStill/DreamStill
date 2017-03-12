require('dotenv').config()
var express = require('express');
var http = require('http');
var path = require('path');
const passport = require('passport');  
const session = require('express-session'); 
var LocalStrategy = require('passport-local').Strategy;
const firebaseAPI = require('./firebase.api.js');
var requestA = require('request');
var oauth2 = require('./oauth2.js');
var nodemailer = require('nodemailer');
const md5 = require('md5');
var ancillaryMethods = require('./ancillaryMethods.js');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(__dirname+'/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(__dirname));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

//email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

require('./authentication').init(app);

app.use(passport.authenticationMiddleware(), function(req, res) {
  if (req.url.indexOf("/login") !== -1){
    res.render('login');
  }else{
    // Use res.sendfile, as it streams instead of reading the file into memory.
    res.sendfile(__dirname + '/app/index.html');
  }
});

app.get('/logout', passport.authenticationMiddleware(), function(req, res){
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

app.get('/getMorpheuzDataAtDate', passport.authenticationMiddleware(), function(req, res){
  firebaseAPI.getMorpheuzDataOfUserAtDate(res, req.user.morpheuzID, req.query.date);
});

app.get('/getMorpheuzDaysWithData', passport.authenticationMiddleware(), function(req, res){
  firebaseAPI.getMorpheuzDaysWithData(res, req.user.morpheuzID);
});

app.get('/getLoggedUser', passport.authenticationMiddleware(), function(req, res){
  var loggedUser;
  loggedUser = {"id": req.user.id, "username": req.user.username, "morpheuzID": req.user.morpheuzID, "googleToken": req.user.googleToken, "alerts": req.user.alerts};
  res.send(loggedUser);
});

app.get('/getAuthToGoogleFit', passport.authenticationMiddleware(), function(req, res){
  // console.log(req.query.code)
  // params -> req.query.code
  oauth2.googleFitAuth(req.user.username, req.query.code, res);
});

app.get('/getAuthToFitbit', passport.authenticationMiddleware(), function(req, res){
  //console.log(req.query.code)
  // params -> req.query.code
  oauth2.fitbitAuth(req.user.username, req.query.code, res);
});

app.get('/forgot', function(req, res){
   return res.render('forgot');
});

app.get('/reset', function(req, res){

  if(firebaseAPI.getUserCredentials(req.query.user).passwordResetToken===req.query.token){
    return res.render('reset', {user: req.query.user});
  }else{
    return res.render('messages', {message: 'El token no es válido, por favor vuelva a comprobar el correo o en caso contrario vuelva a seguir el proceso para restablecer la contraseña.'});
  }
});

app.get('/setAlerts', passport.authenticationMiddleware(), function(req, res){
  //console.log(req.query.alerts);
  var loggedUser = req.user;
  loggedUser.alerts = req.query.alerts;
  //console.log(loggedUser);
  firebaseAPI.updateUserCredentials(loggedUser);
  res.send({status: '200 OK'});
});

app.get('**',  passport.authenticationMiddleware(), function(req, res) {
		res.sendfile(__dirname + '/app/index.html');
	});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      // *** Display message using Express 3 locals
      return res.render('login', {loginMessage: 'Nombre de usuario o contraseña incorrectos'});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      if (req.user.googleFit!=undefined){
        oauth2.googleFitCheckToken(req.user.username, req.user.googleFit.access_token, req.user.googleFit.refresh_token)
      }
      if (req.user.fitbit!=undefined){
        oauth2.fitbitCheckToken(req.user.username, req.user.fitbit.fitbitID, req.user.fitbit.access_token, req.user.fitbit.refresh_token)
      }
      return res.redirect('/');
    });
  })(req, res, next);
});
/*app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));*/

app.post('/register', function(req, res){
    var body = req.body
    /*console.log(req.body);
    console.log("username:"+req.body.username);
    console.log("email:"+req.body.email);
    console.log("password:"+req.body.password);
    console.log("confirmpassword:"+req.body.confirmPassword);*/
    var reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(firebaseAPI.getUserCredentials(body.username).username!==''){
      res.render('login', {registerFailureMessage: 'Ya existe un usuario con ese nombre'});
    }else if(body.username !== '' && body.email !== '' && reEmail.test(body.email) && body.password !== '' && body.password === body.confirmPassword){
      firebaseAPI.registerUser(body.username, body.email, body.password);
      res.render('login', {registerSuccessMessage: '¡Registro realizado con éxito!'});
    }else{
      return res.redirect('/');
    }
});

app.post('/forgot', function (req, res) {
    console.log('Username: '+req.body.username);
    var username = req.body.username;
    var user = firebaseAPI.getUserCredentials(username);
    if(user.email!=''){
      token = md5(user.id+new Date().valueOf());
      var mailOptions = {
      from: 'DreamStill <dreamstillapp@gmail.com>',
      to: user.email,
      subject: 'Restablecer contraseña',
      text: 'Hola '+user.username+': \n\nPara restablecer tu contraseña te rogamos que accedas al siguiente enlace http://localhost:3000/reset?user='+user.username+'&token='+token+' \n\nSi no has sido tú quien ha pedido restablecer la contraseña te rogamos que ignores éste mensaje. \n\nUn saludo. \nGracias por usar DreamStill.'
      };
      user.passwordResetToken = token;
      firebaseAPI.updateUserCredentials(user);
      userMail = ancillaryMethods.obscureEmail(user.email);
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
            return res.render('messages', {message: 'El email ha sido envíado a la siguiente dirección: '+userMail+' por favor compruebe su bandeja de entrada.'});
        };
    });
    }else{
      res.render('forgot', {errorMessage: 'El usuario introducido no está registrado en el sistema'});
    }
});

app.post('/reset', function (req, res) {
    var password = req.body.password;
    var confirm = req.body.confirmPassword;
    var username = req.body.user;
    if (password !== confirm) return res.render('reset', {errorMessage: 'Las contraseñas introducidas no coinciden.', user: username});

    var user = firebaseAPI.getUserCredentials(username);
    user.password = md5(password);
    user.passwordResetToken = '';
    firebaseAPI.updateUserCredentials(user);

    return res.render('messages', {message: 'Su contraseña ha sido restablecida con éxito vuelva a la página principal y acceda con su nueva contraseña.'});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});