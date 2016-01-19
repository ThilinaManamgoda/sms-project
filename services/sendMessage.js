/**
 * Created by Maana on 1/13/2016.
 */
var request = require('request');
var Settings = require('../models/settings');
module.exports = {


    send: function (req, res, next) {
        var message = req.body.message;
        Settings.findOne({settings:'config'},function(error,config){

            var id = config.phonenumber;
            var pw = config.password;
            var numbers='9477xxxxxxx';
            //REPLACE MESSAGE SPACE WITH '+' AND TRIMMING
            message = encodeURIComponent(message);
            //CALL REST API OF www.textit.biz
            request('http://www.textit.biz/sendmsg?id='+id+'&pw='+pw+'&to=' + numbers + '&text=' + message, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    req.flash('messagesent','Message Sent !');
                    next();
                }else{
                    req.flash('messagesent','Message not Sent !');
                    next();
                }
            });




        });






    }

}
