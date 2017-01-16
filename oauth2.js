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
      body: 'code=' + code + '&client_id=' + process.env.GOOGLE_CLIENT_ID + '&client_secret=' + process.env.GOOGLE_CLIENT_SECRET + '&redirect_uri=http://localhost:3000/getAuthToGoogleFit&grant_type=authorization_' +
          'code'
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      } else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
      } else {
        console.log('Done!')
        //console.log(body) console.log(JSON.parse(body)["access_token"])
        googleFitSetTokenToUser(username, JSON.parse(body)["access_token"], JSON.parse(body)["refresh_token"])
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
      body: 'code=' + code + '&client_id=' + process.env.FITBIT_CLIENT_ID + '&redirect_uri=http://localhost:3000/getAuthToFitbit&grant_type=authorization_cod' +
          'e'
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      } else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
      } else {
        console.log('Done!')
        console.log(body)
        //console.log(JSON.parse(body)["access_token"])
        firebaseAPI.setFitbitTokenToUser(username, JSON.parse(body)["user_id"], JSON.parse(body)["access_token"], JSON.parse(body)["refresh_token"])
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
      } else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        errorCause = JSON.parse(body)["error"];
        console.log(errorCause);
        if (errorCause == "invalid_token") {
          googleFitRefreshToken(username, refresh_token);
        }
      } else {
        console.log('Done!')
        //console.log(body)
      }
    });
  },

  fitbitCheckToken: function (username, fitbitID, access_token, refresh_token) {
    /*
    GET https://api.fitbit.com/1/user/-/profile.json
    Authorization: Bearer access_token
    */
    requestA({
      url: 'https://api.fitbit.com/1/user/' + fitbitID + '/profile.json',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    }, function (error, response, body) {
      if (error) {
        console.error(error, response, body);
      } else if (response.statusCode >= 400) {
        console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
        errorCause = JSON.parse(body)["errors"][0]["errorType"];
        console.log(errorCause);
        if (errorCause == "expired_token") {
          fitbitRefreshToken(username, fitbitID, refresh_token);
        }
      } else {
        console.log('Done!')
        //console.log(body)
      }
    });
  }
}

function googleFitSetTokenToUser(username, access_token, refresh_token) {
  requestA({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    }
  }, function (error, response, body) {
    if (error) {
      console.error(error, response, body);
    } else if (response.statusCode >= 400) {
      console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
      console.log(refresh_token)
    } else {
      console.log('Done!')
      //console.log(body)
      console.log(JSON.parse(body)["id"])
      userId = JSON.parse(body)["id"]
      firebaseAPI.setGoogleTokenToUser(username, userId, access_token, refresh_token)
    }
  });
}

function googleFitRefreshToken(username, refresh_token) {
  requestA({
    url: 'https://www.googleapis.com/oauth2/v4/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'client_id=' + process.env.GOOGLE_CLIENT_ID + '&client_secret=' + process.env.GOOGLE_CLIENT_SECRET + '&refresh_token=' + refresh_token + '&grant_type=refresh_token&access_type=offline'
  }, function (error, response, body) {
    if (error) {
      console.error(error, response, body);
    } else if (response.statusCode >= 400) {
      console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
      console.log(refresh_token)
    } else {
      console.log('Done!')
      //console.log(body)
      console.log(JSON.parse(body)["access_token"])
      firebaseAPI.setGoogleTokenToUser(username, JSON.parse(body)["access_token"], refresh_token)
    }
  });
}

function fitbitRefreshToken(username, fitbitID, refresh_token) {
  requestA({
    url: 'https://api.fitbit.com/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + new Buffer(process.env.FITBIT_CLIENT_ID + ":" + process.env.FITBIT_CLIENT_SECRET).toString("base64")
    },
    body: 'grant_type=refresh_token&refresh_token=' + refresh_token + '&expires_in=604800'
  }, function (error, response, body) {
    if (error) {
      console.error(error, response, body);
    } else if (response.statusCode >= 400) {
      console.error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body);
      console.log(refresh_token)
    } else {
      console.log('Done!')
      //console.log(body)
      console.log(JSON.parse(body)["access_token"])
      firebaseAPI.setFitbitTokenToUser(username, fitbitID, JSON.parse(body)["access_token"], refresh_token)
    }
  });
}
