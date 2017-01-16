require('dotenv').config()
const firebaseAPI = require('./firebase.api.js');
var requestA = require('request');

module.exports = {

    getDaysWithSleepFromDate: function (user_id, access_token, date) {
        requestA({
        url: 'https://api.fitbit.com/1/user/' + user_id + '/sleep/timeInBed/date/' + date + '/today.json',
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
            for (var day of JSON.parse(body)["sleep-timeInBed"]) {
                if (day["value"] > 0) {
                    console.log(day)
                    getSleepOfDate(user_id, access_token, day["dateTime"]);
                }
            }
        }
    });
    }
}

function getSleepOfDate(user_id, access_token, date) {
    requestA({
        url: 'https://api.fitbit.com/1/user/' + user_id + '/sleep/date/' + date + '.json',
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
            //console.log(body)
            for (var data of JSON.parse(body)["sleep"]) {
                if (data["isMainSleep"]) {
                    console.log(data["minuteData"])
                }
            }
        }
    });
}