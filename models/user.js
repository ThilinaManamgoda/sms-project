/**
 * Created by Maana on 1/17/2016.
 */


var mongoose = require('mongoose');


var userSchema = mongoose.Schema;
var objectId = userSchema.ObjectId;



module.exports=mongoose.model('User',new userSchema({
    id:objectId,
    email:{type:String ,unique:true},
    password:String

}));