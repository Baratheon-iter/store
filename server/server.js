const express = require('express');
const app = express();
const path = require('path');
const itemController = require('./controllers/itemController.js');
const customerController = require('./controllers/customerController.js');
const db = require('./postgresql.js');
const http = require('http');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const session = require('express-session')
let rooms;  // important

const PORT = process.env.PORT || 3000;
let callbackURL = "http://localhost:3000/googleOAuth";

if(process.env.NODE_ENV === "Production") {
  callbackURL = "http://54.161.32.236/googleOAuth";
}

let sessions = {secret: 'TESTING', name: 'login', proxy: true, resave: true, saveUninitialized: false};

app.use(session(sessions));
app.use(bodyParser.json(), passport.initialize());
app.use(passport.session());


//This is ugly, I know.
function createUserAndCart(username, user, done) {
    db.one(`INSERT INTO "customer"("username") VALUES($1) RETURNING "id"`, [username])
        .then(data => {
            let customerId = data.id;
            db.one(`INSERT INTO "cart"("customerid") VALUES($1) RETURNING "id"`, [customerId])
                .then(data => {
                  user.id = customerId;
                  user.cartid = data.id;
                  user.admin = false;
                  done(null, user);
                })
                .catch(error => {
                    console.log('ERROR AT CART CREATION:', error);
                });
        }).catch(error => {
            console.log('ERROR AT CUSTOMER CREATION:', error);
        });
}

function checkIfUserExists(username, user, done) {
  db.one('SELECT * FROM customer WHERE username = $1', username)
      .then(customer => {
          user.id = customer.id;
          user.admin = customer.admin;
          done(null, user);
      })
      .catch( () => {
        return createUserAndCart(username, user, done);    
      });
}

function loggedIn(req, res, next) {
  if (req.user && sessions[req.user.displayName]) {
    res.locals = req.user.admin; // helps me determine if user is admin
    next();
  } else {
    res.redirect('/login');
  }
}

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: callbackURL
}, function(accessToken, refreshToken, profile, cb) {
    sessions[profile.displayName] = profile;
    return cb(null, {displayName: profile.displayName, profile: profile});
}));

passport.serializeUser(function(user, done) {
  checkIfUserExists(user.displayName, user, done);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
})

//============> PRODUCT ROUTES <===============\\

app.get('/', loggedIn, socketSetup, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
})
app.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
})
app.get('/cart', loggedIn, socketSetup, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
})
app.get('/main', loggedIn, socketSetup, itemController.getAllItems)


//==========> OTHER ROUTES <===========\\

app.post('/api/additem', itemController.findCustomerCart, itemController.checkIfItemAlreadyAddedToCart, itemController.incrementCartItemQuantity);
app.post('/api/customers', customerController.createUser);

app.get('/googleLogin', passport.authenticate('google', {scope: ['profile']}));
app.get('/googleOAuth', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
    res.redirect('/');
})
app.get('/getUserInfo', (req, res) => {
  newObj = {
    name: req.user.profile.name.givenName,
    id: req.user.profile.id,
    // admin: false
    admin: req.user.admin
  }
  res.send(JSON.stringify(newObj));
})

app.get('/getRooms', (req, res) => {
  res.send(JSON.stringify(rooms));
})

app.use(express.static(path.join(__dirname, '../build')));

//==================> SOCKETS <=====================\\

const server = app.listen(PORT, console.log(`Listening on port: ${PORT} ==> this is so toight`));

const io = socket(server);

function socketSetup(req, res, next) {
  console.log(res.locals);
  if (!res.locals) userSocket();
  else adminSocket();
  next();
}

let sendFirstMessage = false;

function userSocket() {
  io.on('connection', (socket) => {
    console.log("connect to socket: ", socket.id);

    let room;

    socket.on('room', (rm) => {
      room = rm;
      socket.join(rm);

      if (!sendFirstMessage) {
        io.in(room).emit('RECEIVE_MESSAGE', {
          author: 'Admin',
          message: 'How can I help you?',
          admin: true
        });
        sendFirstMessage = true;
      }
      // console.log(io.sockets.adapter.rooms);
    });

    socket.on('SEND_MESSAGE', function(data){
      io.in(room).emit('RECEIVE_MESSAGE', data);
    })
  });
}

function adminSocket() {
  io.on('connection', (socket) => {
    console.log("connect to socket: ", socket.id);
    console.log(io.sockets.adapter.rooms);
  });
  rooms = io.sockets.adapter.rooms;
}