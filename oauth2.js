require('dotenv').config()
const firebaseAPI = require('./firebase.api.js');
var requestA = require('request');

module.exports = {

  googleFitAuth: function (username, code, res) {
    requestA({
      url: 'https://accounts.google.com/o/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'accounts.google.com'
      },
      body: 'code=' + code + '&client_id=' + process.env.GOOGLE_CLIENT_ID + '&client_secret=' + process.env.GOOGLE_CLIENT_SECRET + '&redirect_uri=http://localhost:3000/getAuthToGoogleFit&grant_type=authorization_code'
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
        //console.log(JSON.parse(body)["access_token"])
        firebaseAPI.setGoogleTokenToUser(username, JSON.parse(body)["access_token"], JSON.parse(body)["refresh_token"])
        res.redirect("/")
      }
    });
  },

  fitbitAuth: function (username, code, res) {
    requestA({
      url: 'https://api.fitbit.com/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + new Buffer(process.env.FITBIT_CLIENT_ID + ":" + process.env.FITBIT_CLIENT_SECRET).toString("base64")
      },
      body: 'code=' + code + '&client_id=' + process.env.FITBIT_CLIENT_ID + '&redirect_uri=http://localhost:3000/getAuthToFitbit&grant_type=authorization_code'
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      }
      else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
      } else {
        console.log('Done!')
        //console.log(body)
        //console.log(JSON.parse(body)["access_token"])
        firebaseAPI.setFitbitTokenToUser(username, JSON.parse(body)["access_token"], JSON.parse(body)["refresh_token"])
        res.redirect("/")
      }
    });
  },

  googleFitCheckToken: function (username, access_token, refresh_token) {
    //https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=access_token
    requestA({
      url: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + access_token,
      method: 'GET'
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      }
      else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        errorCause = JSON.parse(body)["error"];
        console.log(errorCause);
        if (errorCause == "invalid_token") {
          googleFitRefreshToken(username, refresh_token);
        }
      } else {
        console.log('Done!')
      }
    });
  },

  fitibitCheckToken: function (username, access_token, refresh_token) {
    /*
    GET https://api.fitbit.com/1/user/-/profile.json
    Authorization: Bearer access_token
    */
    requestA({
      url: 'https://api.fitbit.com/1/user/-/profile.json',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      }
      else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        errorCause = JSON.parse(body)["error"];
        console.log(errorCause);
        if (errorCause == "invalid_token") {
          googleFitRefreshToken(username, refresh_token);
        }
      } else {
        console.log('Done!')
      }
    });
  }
}

function googleFitCheckToken(username, access_token, refresh_token) {
    //https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=access_token
    requestA({
      url: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + access_token,
      method: 'GET'
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      }
      else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        errorCause = JSON.parse(body)["error"];
        console.log(errorCause);
        if (errorCause == "invalid_token") {
          googleFitRefreshToken(username, refresh_token);
        }
      } else {
        console.log('Done!')
      }
    });
  }

function googleFitRefreshToken(username, refresh_token) {
  requestA({
      url: 'https://www.googleapis.com/oauth2/v4/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'client_id=930495267346-vm7uumk0hjfmvb8rd3pre2tf5qn177m3.apps.googleusercontent.com&client_secret=' + process.env.GOOGLE_CLIENT_SECRET + '&refresh_token=' + refresh_token + '&grant_type=refresh_token&access_type=offline'
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      }
      else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        console.log(refresh_token)
      }
      else {
        console.log('Done!')
        //console.log(body)
        console.log(JSON.parse(body)["access_token"])
        firebaseAPI.setGoogleTokenToUser(username, JSON.parse(body)["access_token"], refresh_token)
        res.redirect("/")
      }
    });
}

function fitbitRefreshToken(username, refresh_token) {
}

googleFitCheckToken("juanra", "ya28.Ci_SA2Q8jHXODLiH4Mam6piEYO4ydNnObyJsfErCEQNEBk5jgusCShav_Iw82TBZjg","1/aq2INVwqlPaDRYLCdfMvonM2-kbjtjd7Z22HDSbl-VcuuN_dUJ_NSzX3QHEgUzr")