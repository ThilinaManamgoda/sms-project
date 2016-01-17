/**
 * Created by Maana on 1/13/2016.
 */
var request = require('request');
module.exports = {


    send: function (req, res, next) {
        var message = req.body.message;
        //PHONE NUMBERS WHICH MESSAGE WILL BE SENT
        var numbers = '94770445855';
        //REPLACE MESSAGE SPACE WITH '+' AND TRIMMING
        message = encodeURIComponent(message);
        //CALL REST API OF www.textit.biz
        request('http://www.textit.biz/sendmsg?id=94770445855&pw=3627&to=' + numbers + '&text=' + message, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                req.flash('messagesent','Message Sent !');
                next();
            }else{
                req.flash('messagesent','Message not Sent !');
                next();
            }
        });

    }

}
