/**
 * Created by Maana on 1/17/2016.
 */
var key = 'uahrhasid732e47hwd7a3h64r3beru3';

// Create an encryptor:
var encryptor = require('simple-encryptor')(key);

module.exports = {
    encrypt: function encrypt(text) {
        var encrypted = encryptor.encrypt(text);
        return encrypted;
    },

    decrypt: function (encrypted) {
        var decrypted = encryptor.decrypt(encrypted);

        return decrypted;
    },
    isMatch: function (encryptPassword, userPassword) {

        var decrypted = encryptor.decrypt(encryptPassword);
//        console.log(decrypted);
//        console.log(encryptPassword);
        if (decrypted === userPassword) {
            return true;
        } else {
            return false;
        }

    }
}


