require('dotenv').config()
const firebaseAPI = require('./firebase.api.js');
var requestA = require('request');

module.exports = {

    getDaysWithSleepFromDate: function (user, access_token, date) {
        var fitbitID = user.fitbit.fitbitID;
        requestA({
            url: 'https://api.fitbit.com/1/user/' + fitbitID + '/sleep/timeInBed/date/' + date + '/today.json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + access_token
            }
        }, function (error, response, body) {
            if (error) {
                console.error(error, response, body);
            } else if (response.statusCode >= 400) {
                console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);

            } else {
                console.log('Done!')
                console.log(body)
                for (var day of JSON.parse(body)["sleep-timeInBed"]) {
                    if (day["value"] > 0) {
                        console.log(day)
                        getSleepOfDate(user, access_token, day["dateTime"]);
                    }
                }
            }
        });
    }
}

function getSleepOfDate(user, access_token, date) {
    var fitbitID = user.fitbit.fitbitID;
    requestA({
        url: 'https://api.fitbit.com/1/user/' + fitbitID + '/sleep/date/' + date + '.json',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + access_token
        }
    }, function (error, response, body) {
        if (error) {
            console.error(error, response, body);
        } else if (response.statusCode >= 400) {
            console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);

        } else {
            console.log('Done!');
            //console.log(body)
            for (var data of JSON.parse(body)["sleep"]) {
                if (data["isMainSleep"]) {
                    console.log(data["minuteData"]);
                    sleepData = data["minuteData"];
                    json = "{\"" + date + "\":[";
                    i = 0
                    console.log(sleepData.length)
                    for (var event of sleepData) {
                        if (i < sleepData.length - 1) {
                            json += "{\"Hour\":\"" + event["dateTime"] + "\",\"Movements\":\"" + event["value"] + "\"},";
                        } else {
                            json += "{\"Hour\":\"" + event["dateTime"] + "\",\"Movements\":\"" + event["value"] + "\"}";
                        }
                        i++;
                    }
                    json += "]}";
                    console.log(json)
                    //console.log(json[json.length-1])
                    setFitbitDataToUser(user, json);
                }
            }
        }
    });
}

function setFitbitDataToUser(user, data) {
    var fitbitID = user.fitbit.fitbitID;
    requestA({
        url: 'https://dreamstill-d507c.firebaseio.com/fitbit/' + fitbitID + '.json?auth=' + process.env.FIREBASE_SECRET,
        method: 'PATCH',
        headers: {
            'Content-Type': ' application/json'
        },
        body: data
    }, function (error, response, body) {
        if (error) {
            console.error(error, response, body);
        } else if (response.statusCode >= 400) {
            console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        } else {
            console.log('Done!')
        }
    });
}

/*user = {fitbit:{fitbitID:'5BMBQH'}}
access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Qk1CUUgiLCJhdWQiOiIyMjg3M1giLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJycHJvIHJzbGUiLCJleHAiOjE0OTA2NjMzOTMsImlhdCI6MTQ5MDYzNDU5M30.lA ZC2Q0bKB3g3Mkr8S7r0VZMlz0b19L-VQs6mrjr5GA'
module.exports.getDaysWithSleepFromDate(user, access_token, '2016-01-01');*/