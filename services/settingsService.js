/**
 * Created by Maana on 1/18/2016.
 */


var Settings = require('../models/settings');
module.exports = {

    store:function(req,res,next){

        var newsettings = new Settings({
            phonenumber:req.phonenumber,
            password:String,
            settings:'config'

        });
        newsettings.save(function(error){
            if(error){
                req.flash('passwordChangeMessage', '');
                req.flash('settingsMessage','Failed !');
                next();
            }else{
                req.flash('passwordChangeMessage', '');
                req.flash('settingsMessage','Saved  !');
                next();
            }
        });
    },
    getconfig:function(){
        console.log('getconfig');
        var return_config='ad';
       Settings.findOne({settings:'config'},function(error,config){
            if(error){
//                return 'error';
                console.log('config error');

            }else{
//                console.log(config.phonenumber);
                return_config= config;

            }


        });
        console.log( 'return');
        console.log( return_config);
        return return_config;
    },
    setSettings:function(req,res,next){
        Settings.findOne({settings:'config'},function(error,config){
            if(!config){
               req.flash('phonenumber','xxxxxxxxx');
                next();
            }else{
                req.flash('phonenumber',config.phonenumber);
                next();
            }


        });
    },

    save:function(){
        var newsettings = new Settings({
            phonenumber:'94702018761',
            password:'8949',
            settings:'config'

        });
            newsettings.save(function(error){
               if(error) console.log(error);
            });
//        Settings.findOne({settings:'config'},function(error,config){console.log(config.phonenumber)});
    }



}