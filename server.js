/**
 * Created by Maana on 1/17/2016.
 */
var express = require('express');
var app = express();
var port     = process.env.PORT || 8080;
var morgan   = require('morgan');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session = require('client-sessions');
var mongoose = require('mongoose');

//=========================================================================================================
//CONNECT MONGODB==========================================================================================
//=========================================================================================================

mongoose.connect('mongodb://localhost/smsauth');
//---------------------------------------------------------------------------------------------------------


//=========================================================================================================
//MIDDLEWARES==============================================================================================
//=========================================================================================================
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extend:true})); // get information from html forms
app.use(session({
    cookieName:'session',
    secret:'sdadsads23swdadsadasdadad',
    duration:30*60*1000,
    activeDuration:5*60*1000
}));
app.use(flash()); // use connect-flash for flash messages stored in session
// set up ejs for templating
app.set('view engine', 'ejs');
//---------------------------------------------------------------------------------------------------------


//=========================================================================================================
//SETTING UP ROUTING=======================================================================================
//=========================================================================================================
var routes= require('./routes/routes')(app);
//---------------------------------------------------------------------------------------------------------

//=========================================================================================================
//STARTING THE SERVER======================================================================================
//=========================================================================================================
var save=require('./config/authentication');
save.save();
app.listen(port);
console.log('The magic happens on port ' + port);