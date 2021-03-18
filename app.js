const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const i18n = require('i18n')

const config = require('./config/config')
const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose
    .connect(
        config.database.url,
        { useNewUrlParser: true ,useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

i18n.configure({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    cookie: 'ln',
    directory: path.join(__dirname, 'locales'),
    updateFiles: false,
    objectNotation: true
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init)
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
// app.use('/users', require('./routes/users'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
