require('dotenv').config()
var firebaseAPI = require('./firebase.api.js');
var ancillaryMethods = require('./ancillaryMethods.js');

module.exports = {

    checkAlerts: function (user) {
        var days = 3;
        var today = new Date();
        var dateDays = [];
        var apisOfUser = {};
        var daysWithData = {};
        var sleepedHours = {};

        for (var i = 0; i < days; i++) {
            var date = today;
            date.setDate(today.getDate() - i);
            dateDays.push(date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
        }

        if (user.morpheuzID !== undefined) {
            apisOfUser['morpheuz'] = user.morpheuzID;
        }

        if (user.fitbit !== undefined) {
            apisOfUser['fitbit'] = user.fitbit.fitbitID;
        }

        for (api in apisOfUser) {
            daysWithData[api] = firebaseAPI.getDaysWithDataFromApi(api, apisOfUser[api]);
        }

        for (api in apisOfUser) {
            for (date of dateDays) {
                var infoOfDay = firebaseAPI.getDaysWithDataFromApiAtDate(api, apisOfUser[api], date);
                // console.log(infoOfDay); console.log(ancillaryMethods.getSleepedHours(api,
                // infoOfDay));
                if (infoOfDay !== null && ancillaryMethods.getSleepedHours(api, infoOfDay) !== 0) {
                    if (sleepedHours[date] !== 'undefined') {
                        sleepedHours[date] = ancillaryMethods.getSleepedHours(api, infoOfDay);
                    } else {
                        if (sleepedHours[date] < ancillaryMethods.getSleepedHours(api, infoOfDay)) {
                            sleepedHours[date] = ancillaryMethods.getSleepedHours(api, infoOfDay);
                        }
                    }
                }
            }
        }

        /*console.log(daysWithData);
        console.log(dateDays);
        console.log(sleepedHours);*/

        return sleepedHours;
    }
}

console.log(module.exports.checkAlerts(firebaseAPI.getUserCredentials("juanra")));