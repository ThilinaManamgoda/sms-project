/**
 * Created by Maana on 1/18/2016.
 */
var number = '94770445855';
var URL = 'http://www.textit.biz/creditchk/index.php?id='+number+'&pw=3627';
var request = require('request');


module.exports = {
    getBalance: function (req,res,next) {

    var number='94770445855';

    request('http://www.textit.biz/creditchk/index.php?id='+number+'&pw=3627', function (error, response, body) {
        if (!error && response.statusCode == 200) {
           req.flash('balance',body);
            next();
        }
    });
}

}