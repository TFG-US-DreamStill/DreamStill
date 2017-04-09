require('dotenv').config()
var log4js = require('log4js');
var logger = log4js.getLogger();
log4js.replaceConsole();
var request = require('sync-request');
var firebaseAPI = require('./firebase.api.js');
var nodemailer = require('nodemailer');
var ancillaryMethods = require('./ancillaryMethods.js');


//email
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = {

    checkAlerts: function (user) {
        console.log("DIAS: "+ getInfoOfUserAlerts(user.id).days);
        console.log("HORAS: "+ getInfoOfUserAlerts(user.id).hours);
        var days = getInfoOfUserAlerts(user.id).days;
        var desiredHours = getInfoOfUserAlerts(user.id).hours;
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
            daysWithData[api] = getDaysWithDataFromApi(api, apisOfUser[api]);
        }

        for (api in apisOfUser) {
            for (date of dateDays) {
                var infoOfDay = getDaysWithDataFromApiAtDate(api, apisOfUser[api], date);
                /*console.log(infoOfDay); console.log(ancillaryMethods.getSleepedHours(api, infoOfDay));*/
                if (infoOfDay !== null && ancillaryMethods.getSleepedHours(api, infoOfDay) !== 0) {
                    if (sleepedHours[date] == undefined) {
                        sleepedHours[date] = ancillaryMethods.getSleepedHours(api, infoOfDay);
                    } else {
                        if (sleepedHours[date] < ancillaryMethods.getSleepedHours(api, infoOfDay)) {
                            sleepedHours[date] = ancillaryMethods.getSleepedHours(api, infoOfDay);
                        }
                    }
                }
            }
        }

        //console.log(daysWithData);
        console.log(dateDays);
        console.log(sleepedHours);
        console.log(Object.keys(sleepedHours).length);
        if (Object.keys(sleepedHours).length == days) {
            for (var date in sleepedHours) {
                sleepedHoursAverage += sleepedHours[date];
            }

            sleepedHoursAverage = Math.round((sleepedHoursAverage / days) * 100) / 100;;
        }

        console.log(sleepedHoursAverage);

        if (sleepedHoursAverage < desiredHours && sleepedHoursAverage!=0) {
            sendAlert(user, days, desiredHours);
        }

    }
}

function getInfoOfUserAlerts(userID) {
    var res = request('GET', 'https://dreamstill-d507c.firebaseio.com/alert/' + userID + '.json?auth=' + process.env.FIREBASE_SECRET, {
      'headers': {
        'Content-Type': ' application/json'
      }
    });

    //console.log(JSON.parse(res.getBody('utf8')));

    var json = JSON.parse(res.getBody('utf8'));

    return json;
  }

function getDaysWithDataFromApi(api, apiID) {

    var res = request('GET', 'https://dreamstill-d507c.firebaseio.com/' + api + '/' + apiID + '.json?auth=' + process.env.FIREBASE_SECRET + '&shallow=true', {
      'headers': {
        'Content-Type': ' application/json'
      }
    });

    //console.log(JSON.parse(res.getBody('utf8')));

    var json = JSON.parse(res.getBody('utf8'));

    return json;

}

function getDaysWithDataFromApiAtDate(api, apiID, date) {
    console.log('https://dreamstill-d507c.firebaseio.com/' + api + '/' + apiID + '/' + date);
    var res = request('GET', 'https://dreamstill-d507c.firebaseio.com/' + api + '/' + apiID + '/' + date + '.json?auth=' + process.env.FIREBASE_SECRET, {
      'headers': {
        'Content-Type': ' application/json'
      }
    });

    //console.log(JSON.parse(res.getBody('utf8')));

    var json = JSON.parse(res.getBody('utf8'));

    return json;

}
function sendAlert(user, days, desiredHours) {
    console.log("Mensaje enviado a <" + user.email + ">: ¡No estás descansando bien! En los últimos " + days + " días has dormido de media menos de " + desiredHours + " horas.");
    var mailOptions = {
      from: 'DreamStill <dreamstillapp@gmail.com>',
      to: user.email,
      subject: 'Alarma de Sueño',
      text: '¡No estás descansando bien! En los últimos ' + days + ' días has dormido de media menos de ' + desiredHours + ' horas, intenta dormir más la próxima vez. \n\nUn saludo. \nDreamStill'
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            logger.error(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });
}

//module.exports.checkAlerts(firebaseAPI.getUserCredentials("juanra"));