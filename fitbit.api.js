require('dotenv').config()
const firebaseAPI = require('./firebase.api.js');
var requestA = require('request');

module.exports = {

    getDaysWithSleepFromDate: function (user_id, access_token, date) {
        var year = "" + date.getFullYear();
        var month = ("0" + date.getMonth() + 1).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);
        date_from = year + '-' + month + '-' + day;
        requestA({
            url: 'https://api.fitbit.com/1/user/' + user_id + '/sleep/timeInBed/date/' + date_from + '/today.json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + access_token
            },
        }, function (error, response, body) {
            if (error) {
                console.error(error, response, body);
            }
            else if (response.statusCode >= 400) {
                console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
                
            }
            else {
                console.log('Done!')
                console.log(body)
            }
        });
    }
}