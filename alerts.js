require('dotenv').config()
var firebaseAPI = require('./firebase.api.js');
var ancillaryMethods = require('./ancillaryMethods.js');

module.exports = {

    checkAlerts: function (user) {
        var days = 3;
        var desiredHours = 9;
        var dateDays = [];
        var apisOfUser = {};
        var daysWithData = {};
        var sleepedHours = {};
        var sleepedHoursAverage = 0.;

        for (var i = 0; i < days; i++) {
            var date = new Date();
            date.setDate(date.getDate() - i);
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
                // console.log(infoOfDay); console.log(ancillaryMethods.getSleepedHours(api, infoOfDay));
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

        if (Object.keys(sleepedHours).length === days) {
            for (var date in sleepedHours) {
                sleepedHoursAverage += sleepedHours[date];
            }

            sleepedHoursAverage = Math.round((sleepedHoursAverage / days) * 100) / 100;;
        }

        console.log(sleepedHoursAverage);

        if (sleepedHoursAverage < desiredHours) {
            sendAlert(user, days, desiredHours);
        }

    }
}

function sendAlert(user, days, desiredHours) {
    console.log("Mensaje enviado a <" + user.email + ">: ¡No estás descansando bien! En los últimos " + days + " días has dormido de media menos de " + desiredHours + " horas.");
}

//module.exports.checkAlerts(firebaseAPI.getUserCredentials("juanra"));