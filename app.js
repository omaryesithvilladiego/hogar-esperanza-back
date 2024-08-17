var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const userRoute = require('./src/routes/user.router')
const cors = require('cors')

var app = express();

// view engine setup

let corsOptions = {
  origin: ['http://localhost:5173','https://phenomenal-kangaroo-4b2a2d.netlify.app','https://hogar-esperanza-back.onrender.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Agrega otros headers si es necesario
  credentials: true, // Si necesitas enviar cookies o autenticación
};

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(userRoute)

app.use('/', (req,res) => {
  res.send('site live')
})

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
