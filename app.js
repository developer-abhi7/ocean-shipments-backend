const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
var indexRouter = require('./app/routes/index');

// create express app
const app = express();

//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');

//var winston = require('winston');
//var jwt = require('express-jwt');

/*var logger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './logs/error.log' })
    ]
});*/

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

//logger.log('info', 'Hello distributed log files!');
app.use(allowCrossDomain);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());
//app.use(jwt({ secret: 'wildvegas' }).unless({ path: ['/api/auth/login', '/api/maintanence/payment/webhook'] }));


//// app.options("*",function(req,res,next){
////   res.header("Access-Control-Allow-Origin", "*");
////   res.header('Access-Control-Allow-Methods','GET, POST','OPTION','PUT','DELETE');
////   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
////    //other headers here
////     res.status(200).end();
//// });
//// app.use(function(req, res, next){
////     res.setHeader('Access-Control-Allow-Origin','*');
////     res.setHeader('Access-Control-Allow-Methods','GET, POST','OPTION','PUT','DELETE');
////     res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,Authorization');
////     next();
//// });

app.use(function (err, req, res, next) {
    console.log(req.url);
    if (err.name === 'UnauthorizedError') {
        console.log(err);
        res.status(401).send({ status: 'fail', message: 'invalid token' });
    }
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send({ error: 'Not found' })
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send({ error: err })
});


module.exports = app;