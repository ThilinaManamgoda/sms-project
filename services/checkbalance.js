/**
 * Created by Maana on 1/18/2016.
 */
var number = '94770445855';
var URL = 'http://www.textit.biz/creditchk/index.php?id=' + number + '&pw=3627';
var request = require('request');
var Settings = require('../models/settings');
module.exports = {
    getBalance: function (req, res, next) {
        Settings.findOne({settings:'config'},function(error,config){

            request('http://www.textit.biz/creditchk/index.php?id=' + config.phonenumber + '&pw='+config.password, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    req.flash('balance', body);
                    next();
                }
            });



        });

//        console.log(config.phonenumber);


    }

}