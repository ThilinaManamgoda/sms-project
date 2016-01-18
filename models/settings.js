/**
 * Created by Maana on 1/18/2016.
 */

var mongoose = require('mongoose');


var userSchema = mongoose.Schema;
var objectId = userSchema.ObjectId;



module.exports=mongoose.model('Settings',new userSchema({
    id:objectId,
    phonenumber:String,
    password:String,
    settings:String

}));