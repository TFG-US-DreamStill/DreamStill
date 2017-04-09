require('dotenv').config()
var log4js = require('log4js');
log4js.replaceConsole();
var logger = log4js.getLogger();
var request = require('sync-request');

const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
];

module.exports = {
    
    getDates: function () {
        var result;
        var currentMonth;
        var twoMonthBefore;
        var oneMonthBefore;

        currentMonth = months[new Date().getMonth()] + " de "  + new Date().getFullYear();
        twoMonthBefore = new Date();
        twoMonthBefore.setMonth(twoMonthBefore.getMonth() - 2);
        twoMonthBefore = months[twoMonthBefore.getMonth()] + " de " + twoMonthBefore.getFullYear();
        oneMonthBefore = new Date();
        oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
        oneMonthBefore = months[oneMonthBefore.getMonth()] + " de "  + oneMonthBefore.getFullYear();
        result = [currentMonth, twoMonthBefore, oneMonthBefore]

        return result;
    },

    getNumEventsOfCurrentMonthForUserId: function (morpheuzID, fitbitID) {
        var result = 0;
        var res = request('GET', 'https://dreamstill-d507c.firebaseio.com/morpheuz/' + morpheuzID + '.json?auth=' + process.env.FIREBASE_SECRET + '&shallow=true', {
            'headers': {
                'Content-Type': ' application/json'
            }
        });

        var resFitbit = request('GET', 'https://dreamstill-d507c.firebaseio.com/fitbit/' + fitbitID + '.json?auth=' + process.env.FIREBASE_SECRET + '&shallow=true', {
            'headers': {
                'Content-Type': ' application/json'
            }
        });

        events = JSON.parse(res.getBody('utf8'));
        eventsFitbit = JSON.parse(resFitbit.getBody('utf8'));
        var daysOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
        console.log(daysOfMonth);
        for (var _i = 1; _i <= daysOfMonth; _i++) {
            var date = new Date(new Date().getFullYear(), new Date().getMonth(), _i)
            var year = "" + date.getFullYear();
            var month = ("0" + (date.getMonth() + 1)).slice(-2);
            var day = ("0" + date.getDate()).slice(-2);
            if (events[year + "-" + month + "-" + day] !== undefined) {
                result++;
            }
            if (eventsFitbit[year + "-" + month + "-" + day] !== undefined) {
                result++;
            }
        }
        return result;
    },

    obscureEmail: function (email) {
        var emailSplit = email.split('@');
        var email = '';
        for (i = 0; i < emailSplit[0].length; i++) {
            if (i <= emailSplit.length / 2) {
                email += emailSplit[0][i];
            } else {
                email += '*';
            }
        }
        var result = email + '@' + emailSplit[1];

        return result;
    },

    getSleepedHours: function (api, date) {
        var result = 0;
        var minutes = 0;
        if (api === 'morpheuz' && date !== null) {
            for (moment in date) {
                if (date[moment]['Movements'] !== '-1' && date[moment]['Movements'] !== '-2' && date[moment]['Movements'] !== 'START' && date[moment]['Movements'] !== 'END' && date[moment]['Movements'] !== 'ALARM') {
                    minutes = minutes + 10;
                }
            }
        }
        if (api === 'fitbit' && date !== null) {
            minutes = date.length;
        }

        result = Math.round((minutes / 60) * 100) / 100;

        return result;
    }
};