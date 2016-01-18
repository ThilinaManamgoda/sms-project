/**
 * Created by Maana on 1/17/2016.
 */

var authentication = require('../config/authentication');
var balance = require('../services/checkbalance');
var message = require('../services/sendMessage');
var Settings = require('../services/settingsService');
var interceptResponse = require('../services/interceptResponse');
module.exports = function(app) {


//=========================================================================================================
//Response ROUTE=========================================================================================
//=========================================================================================================
    app.get('/response/', interceptResponse.loadResponse, function (req, res) {
//        // render the page and pass in any flash data if it exists
//        req.session.reset();
//        res.redirect('/login');
        res.send(200).end;

    });
//=========================================================================================================
//=========================================================================================================
//=========================================================================================================


//=========================================================================================================
//LOGOUT ROUTE=========================================================================================
//=========================================================================================================
    app.get('/logout', authentication.isAuthorized, function (req, res) {
        // render the page and pass in any flash data if it exists
        req.session.reset();
        res.redirect('/login');

    });
//=========================================================================================================
//=========================================================================================================
//=========================================================================================================

//=========================================================================================================
//MESSAGE ROUTE=========================================================================================
//=========================================================================================================
    app.get('/message', authentication.isAuthorized, function (req, res) {
        // render the page and pass in any flash data if it exists

        res.render('message.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/message', authentication.isAuthorized,message.send, function (req, res) {
        // render the page and pass in any flash data if it exists

        res.render('message.ejs', { message: req.flash('messagesent') });
    });
//=========================================================================================================
//=========================================================================================================
//=========================================================================================================

//=========================================================================================================
//LOGIN ROUTE=========================================================================================
//=========================================================================================================

    app.get('/login', function (req, res) {
        // render the page and pass in any flash data if it exists

        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/login', authentication.authorizing, function (req, res) {

        res.redirect('/message');
    });

//=========================================================================================================
//=========================================================================================================
//=========================================================================================================

    //=========================================================================================================
//SETTINGS ROUTE=========================================================================================
//=========================================================================================================
    app.get('/settings', authentication.isAuthorized,balance.getBalance,Settings.setSettings, function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('settings.ejs', { passwordChangeMessage: req.flash('passwordChangeMessage'),balance:req.flash('balance') ,settingsMessage:req.flash('settingsMessage'),phonenumber:req.flash('phonenumber')});
    });
    app.post('/settings', authentication.isAuthorized,authentication.updatePassword,balance.getBalance, function (req, res) {
        // render the page and pass in any flash data if it exists

//        console.log( req.flash('passwordChangeMessage'));
        res.render('settings.ejs', { passwordChangeMessage: req.flash('passwordChangeMessage') ,balance:req.flash('balance'),settingsMessage:req.flash('settingsMessage'),phonenumber:req.flash('phonenumber') });
    });
//=========================================================================================================
//=========================================================================================================
//=========================================================================================================
}


