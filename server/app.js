require('./configuration/config')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs')
var session = require('express-session')
// var multer = require('multer');
/* var upload = multer({
  dest: './uploads'
}); */
var passport = require('passport');
var flash = require('connect-flash')
// var moment = require('moment');
var expressValidator = require('express-validator');

/* var exphbs = require('express-handlebars');
var Handlebars = require('handlebars')
 */


var {
  db
} = require('./db/monk_config');

var indexRouter = require('./routes/index');
var postRouter = require('./routes/posts');
var categoryRouter = require('./routes/categories');

var app = express();


//setting moment libr as global variable soo that it can be used in index.hbs to format the date
/* app.locals.moment = moment;

app.locals.truncateText = function (text,length) {
  let truncatedText = text.substring(0,length);
  return truncatedText;
} */
// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '../views/partials'))
hbs.localsAsTemplateData(app); //this is for Exposing locals variable as template data
//when we use app.locals & res.locals -> to set the global variable which can be used in Template engine (Handlebars)

//-------------------Playground-------------------------------
/* var Handlebars = express_handlebars.create({
  helpers :{
    foo : function () {
      return 'Hello world'
    }
  }
}) */
/* app.engine('handlebars', Handlebars.engine);
app.set('view engine', 'handlebars'); */

/* Handlebars.registerHelper('mycustomBlock', function(property){
  return 'Hello world'
})
 */
/* 
Handlebars = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'layout.hbs',
  helpers: {
      formatDate: function (date, format) {
          return moment(date).format(format);
      }
  }
}); */
/* 
app.engine('hbs', exphbs.engine);
app.set('view engine', 'hbs'); */

/* var helpers = require('handlebars-helpers');
helpers.date(); */
/* 
Handlebars.registerHelper("printItems", function(items) {
  // var html = "<ul>";
  // items.forEach(function(entry) {
  //   html += "<li>" + entry + "</li>";
  // });
  // html += "</ul>";
  // return html;
  return new Handlebars.SafeString("helloworld");
});

var context = {
  author: {firstName: "Alan", lastName: "Johnson"},
  body: "I Love Handlebars",
  comments: [{
    author: {firstName: "Yehuda", lastName: "Katz"},
    body: "Me too!"
  }]
};

Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
}); */
//--------------------------------------------------

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//middleware for doing session's using ->(express-session, 3rd party libr)
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


//middleware, doing end user authentication using ->(passport, 3rd party libr)
app.use(passport.initialize());
app.use(passport.session()); //telling passport to use session module


//middleware for validation using ->(express-validator, 3rd party libr)
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


//middleware for messages(showing u have logged in successfully and u have logout popups) using -> (connect-flash , 3rd party module)
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res); //res.locals.messages -> this way we can create a global variable called (messages)
  /* console.log(res.locals.messages());
  console.log(res.locals); */
  next();
});


//making our db access to all our routes(db<-is integerated with->monk)
//middleware
app.use(function (req, res, next) {
  req.db = db;
  next();
})
//http://localhost:3000/
app.use('/', indexRouter);
//http://localhost:3000/posts
app.use('/posts', postRouter);
//http://localhost:3000/category
app.use('/categories', categoryRouter);

// catch 404 and forward to error handler
/* app.use(function (req, res, next) {
  next(createError(404));
}); */

app.use(function (req, res, next) {
  let statusCodeVal = res.statusCode;
console.log(statusCodeVal);
  if (statusCodeVal <= 200 || statusCodeVal > 200) {
    //whatever is the invalid url[or irrespective of invalid url] , just convert that url to this -> http://localhost:3000/pagenotfound url
    res.redirect( process.env.URL_404)    //this url response is handled in routes/index.js
  }
  // next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000)

module.exports = app;