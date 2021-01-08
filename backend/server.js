const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const User = require('./models/User');
const Auth = require('./models/auth');

const sendGrid = require('@sendGrid/mail');

const SendGridURI = require('./config/keys').SendGrid;

const posts = require('./routes/posts');
const errorController = require('./controllers/error');

const app = express();

const PORT = 4000;

dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true,
}));

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send(false);
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send(true);
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

app.use('/product', posts);

app.post('/api/email', (req, res, next) => {
  console.log(req.body);

  sendGrid.setApiKey(SendGridURI);
  const msg = {
    to: 'kneeidle.mail@gmail.com',
    from: 'kneeidle.mail@gmail.com',
    subject: `name: ${req.body.name}, email: ${req.body.email}`,
    text: req.body.message,
  };

  sendGrid.send(msg)
    .then((result) => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log('error', err);
      res.status(401).json({
        success: false,
      });
    });
});

app.use(errorController.get404);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => console.log('connected to db'));

app.listen(PORT);
