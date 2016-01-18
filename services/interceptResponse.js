/**
 * Created by Maana on 1/18/2016.
 */


module.exports = {


    loadResponse:function(req,res,next){

        console.log(req.query.phone+' '+req.query.text);
          next();

    }



}