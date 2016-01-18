/**
 * Created by Maana on 1/17/2016.
 */
var User = require('../models/user');
var cript = require('./crypto');
module.exports = {

    authorizing: function (req, res, next) {
        User.findOne({email: req.body.email}, function (err, user) {
            if (!user) {
                res.render('login.ejs', { message: 'Invalid username or password' });
            } else {

                if (cript.isMatch(user.password, req.body.password)) {
                    delete user.password;
                    req.session.user = user;

                    next();
                } else {
                    res.render('login.ejs', { message: 'Invalid username or password' });
                }

            }
        });
    },


    isAuthorized: function (req, res, next) {
        if (req.session && req.session.user) {
            User.findOne({email: req.session.user.email}, function (err, user) {
                if (!user) {
                    req.session.reset();
                    req.redirect('/login');
                } else {

                    delete user.password;
                    req.session.user = user;
                    req.flash('test', 'test!');
                    next();
                }
            });
        } else {
            res.redirect('/login');
        }
    },
    updatePassword: function (req, res, next) {
        console.log('updating');
//        console.log(req.flash('test'));
        User.findOne({email: req.session.user.email}, function (err, user) {
            if (!user) {
                req.flash('passwordChangeMessage', 'Invalid user !');
                res.render('settings.ejs', { passwordChangeMessage: req.flash('passwordChangeMessage')});
            } else {
                if (cript.isMatch(user.password, req.body.currentpassword)) {

                    if (req.body.newpassword == req.body.retypepassword) {
                        var conditions = { email: req.session.user.email}
                            , update = { $set: { password: cript.encrypt(req.body.newpassword) }}
                            , options = { multi: false };

                        User.update(conditions, update, options, function (err, rows) {
                            if (err) {
                                req.flash('passwordChangeMessage', 'Update failed !');
                                res.render('settings.ejs', { passwordChangeMessage: req.flash('passwordChangeMessage')});
                            } else {
                                req.flash('passwordChangeMessage', 'Update success !');
                                next();
                            }
                        });
                    } else {
                        req.flash('passwordChangeMessage', 'Passwords don\'t match !');
                        res.render('settings.ejs', { passwordChangeMessage: req.flash('passwordChangeMessage')});
                    }


                } else {
                    req.flash('passwordChangeMessage', 'Invalid current password');
                    res.render('settings.ejs', { passwordChangeMessage: req.flash('passwordChangeMessage')});

                }

            }
        });


    },

    save: function () {

        var hash = cript.encrypt('12345678');
        var user = new User({

            email: 'admintest@gmail.com',
            password: hash

        });
        user.save(function (error) {


        });
    }


}




