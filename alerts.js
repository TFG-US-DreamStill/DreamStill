require('dotenv').config()
var firebaseAPI = require('./firebase.api.js');

module.exports = {

    checkAlerts: function (user) {
        var days = 3;
        var today = new Date();
        var dateDays = [];
        var apisOfUser = {};
        var daysWithData = {};
        var sleepedHours = {};

        for (var i = 0; i < days; i++){
            var date = today;
            date.setDate(today.getDate() - i);
            dateDays.push(date.getFullYear()  + "-" + (date.getMonth() + 1) + "-" + date.getDate());
        }

        if (user.morpheuzID !== undefined){
            apisOfUser['morpheuz'] = user.morpheuzID;
        }

        if (user.fitbit !== undefined){
            apisOfUser['fitbit'] = user.fitbit.fitbitID;
        }

        for (api in apisOfUser){
            daysWithData[api] = firebaseAPI.getDaysWithDataFromApi(api, apisOfUser[api]);
        }

        for (api in apisOfUser){
            for (date in dateDays){
                var infoOfDay = firebaseAPI.getDaysWithDataFromApiAtDate(api, apisOfUser[api], date);
                console.log(infoOfDay);
                if (infoOfDay!==null){
                    if (sleepedHours[date] !== undefined){
                        sleepedHours[date] = getSleepedHours(api, infoOfDay);
                    }else{
                        if (sleepedHours[date] < getSleepedHours(api, infoOfDay)){
                            sleepedHours[date] =  getSleepedHours(api, infoOfDay);
                        }
                    }
                }
            }
        }

        /*console.log(daysWithData);
        console.log(dateDays);*/
    }
}

function getSleepedHours(api, date){}

//console.log(module.exports.checkAlerts(firebaseAPI.getUserCredentials("juanra")));