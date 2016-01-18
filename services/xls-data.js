/**
 * Created by Maana on 1/18/2016.
 */
var converter = require("xls-to-json");




module.exports={

    getData:function(file){
        converter({
            input: file,
            output: null
        }, function(err, result) {
            if(err) {
                console.error(err);
            } else {
                return result;



            }

        });
    }

}
