require('dotenv').config()
var requestA = require('request');
var email2Json = require('./email2Json.js');
var request = require('sync-request');
const md5 = require('md5');
var fitbitApi = require('./fitbit.api.js')

module.exports = {

  getUserCredentials: function (username) {
    var user = { username: '', password: '', id: '', email: '', morpheuzID: '', googleFit: {}, fitbit: {}};

    var res = request('GET', 'https://dreamstill-d507c.firebaseio.com/user_credentials/'+username.toLowerCase()+'.json?auth='+process.env.FIREBASE_SECRET,{
    'headers': {
      'Content-Type' :' application/json'
    }});

    console.log(JSON.parse(res.getBody('utf8')));

    var json = JSON.parse(res.getBody('utf8'));

    if (json !== null){
      user.id = json["id"];
      user.username = username;
      user.email = json["email"];
      user.password = json["password"];
      user.morpheuzID = json["morpheuzID"];
      user.googleFit = json["googleFit"];
      user.fitbit = json["fitbit"];
    }

    return user;
  },

  registerUser: function (username, email, password) {
    var user = { username: '', password: '', id: '', email: ''};
    
    user.username = username.toLowerCase();
    user.password = md5(password);
    user.id = new Date().valueOf();;
    user.email = email;

    requestA({
      url: 'https://dreamstill-d507c.firebaseio.com/user_credentials/'+ user.username + '.json?auth='+process.env.FIREBASE_SECRET,
      method: 'PATCH',
      headers: {
        'Content-Type' :' application/json'/*,
        'Authorization': 'key=AI...8o'*/
      },
      body: JSON.stringify(user)
    }, function(error, response, body) {
        if (error) { 
          console.error(error, response, body); 
        } else if (response.statusCode >= 400) { 
          console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
        } else {
          console.log('Done!')
        }
      });
    },

  getMorpheuzDataOfUserAtDate: function (res, morpheuzID, date) {
    var year = date.split('-')[0];
    var month = date.split('-')[1];
    var day = date.split('-')[2];
    requestA('https://dreamstill-d507c.firebaseio.com/morpheuz/'+morpheuzID+'/'+year+'-'+month+'-'+day+'.json?auth='+process.env.FIREBASE_SECRET, function(error, response, body) {
          if (error) { 
            console.error(error, response, body); 
            res.send(error)
          } else if (response.statusCode >= 400) { 
            console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
          } else {
            console.log('Done!')
            //console.log(body)
            res.send(body)
          }
        });
  },

  setMorpheuzUserData: function (data, morpheuzID) {
    requestA({
      url: 'https://dreamstill-d507c.firebaseio.com/morpheuz/'+ morpheuzID + '.json?auth='+process.env.FIREBASE_SECRET,
      method: 'PATCH',
      headers: {
        'Content-Type' :' application/json'/*,
        'Authorization': 'key=AI...8o'*/
      },
      body: data
    }, function(error, response, body) {
        if (error) { 
          console.error(error, response, body); 
        } else if (response.statusCode >= 400) { 
          console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
        } else {
          console.log('Done!')
        }
      });
  },

  getMorpheuzDaysWithData: function (res, morpheuzID) {
    requestA('https://dreamstill-d507c.firebaseio.com/morpheuz/'+morpheuzID+'.json?auth='+process.env.FIREBASE_SECRET+'&shallow=true', function(error, response, body) {
          if (error) { 
            console.error(error, response, body); 
            res.send(error)
          } else if (response.statusCode >= 400) { 
            console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
          } else {
            console.log('Done!')
            console.log(body)
            res.send(body)
          }
        });
  },

  setGoogleTokenToUser: function (username, access_token, refresh_token) {
    requestA({
      url: 'https://dreamstill-d507c.firebaseio.com/user_credentials/'+ username + '.json?auth='+process.env.FIREBASE_SECRET,
      method: 'PATCH',
      headers: {
        'Content-Type' :' application/json'
      },
      body: JSON.stringify({"googleFit": {"access_token": access_token, "refresh_token": refresh_token}})
    }, function(error, response, body) {
        if (error) { 
          console.error(error, response, body); 
        } else if (response.statusCode >= 400) { 
          console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
        } else {
          console.log('Done!')
        }
      });
    },

  setFitbitTokenToUser: function (username, fitbitID, access_token, refresh_token) {
    requestA({
      url: 'https://dreamstill-d507c.firebaseio.com/user_credentials/'+ username + '.json?auth='+process.env.FIREBASE_SECRET,
      method: 'PATCH',
      headers: {
        'Content-Type' :' application/json'
      },
      body: JSON.stringify({"fitbit": {"access_token": access_token, "refresh_token": refresh_token, "fitbitID": fitbitID}})
    }, function(error, response, body) {
        if (error) { 
          console.error(error, response, body); 
        } else if (response.statusCode >= 400) { 
          console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
        } else {
          console.log('Done!')
        }
      });
    },

    getFitbitDataOfUser: function (fitbitID, access_token) {
      requestA('https://dreamstill-d507c.firebaseio.com/fitbit/'+fitbitID+'.json?auth='+process.env.FIREBASE_SECRET+'&shallow=true', function(error, response, body) {
            if (error) { 
              console.error(error, response, body); 
            } else if (response.statusCode >= 400) { 
              console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 

            } else {
              console.log('Done!');
              console.log(body)
              body === "null"
              ? fitbitApi.getDaysWithSleepFromDate(fitbitID, access_token, "2015-01-01")
              : fitbitApi.getDaysWithSleepFromDate(fitbitID, access_token, "2015-01-01");
            }
          });
    },

    setFitbitDataToUser: function (fitbitID, data) {
      requestA({
      url: 'https://dreamstill-d507c.firebaseio.com/fitbit/'+ fitbitID + '.json?auth='+process.env.FIREBASE_SECRET,
      method: 'PATCH',
      headers: {
        'Content-Type' :' application/json'
      },
      body: data
      }, function(error, response, body) {
        if (error) { 
          console.error(error, response, body); 
        } else if (response.statusCode >= 400) { 
          console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
        } else {
          console.log('Done!')
        }
      });
    },

    getFitbitDaysWithData: function (res, fitbitID) {
      requestA('https://dreamstill-d507c.firebaseio.com/fitbit/'+fitbitID+'.json?auth='+process.env.FIREBASE_SECRET+'&shallow=true', function(error, response, body) {
            if (error) { 
              console.error(error, response, body); 
              res.send(error)
            } else if (response.statusCode >= 400) { 
              console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
            } else {
              console.log('Done!')
              console.log(body)
              res.send(body)
            }
          });
    }
  
}

var to = 'dreamstillapp+18@gmail.com';
var subject = 'Morpheuz-2016-11-05';
var body = `<html><body><h2>Chart Display</h2><a
href='http://ui.morpheuz.net/morpheuz/view-46.html?base=1478303450000&fromhr=08&tohr=09&frommin=45&tomin=00&smart=Y&vers=46&goneoff=N&token=7abbac9e47999d4ef5a44b1e59ebaeee&age=21&emailto=dreamstillapp%2b18@gmail.com&noset=Y&zz=0&lat=37.5&long=-5.1&fault=0&graphx=6c52d31e434234e4980d20a94191a00fa1d303b0442f503235104728002bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'>Report</a><br/><h2>CSV
Sleep
data</h2><pre>00:50,1733<br/>01:00,723<br/>01:10,484<br/>01:20,834<br/>01:30,846<br/>01:40,1176<br/>01:50,210<br/>02:00,169<br/>02:10,1049<br/>02:20,416<br/>02:30,250<br/>02:40,467<br/>02:50,59<br/>03:00,68<br/>03:10,757<br/>03:20,50<br/>03:30,849<br/>03:40,71<br/>03:50,640<br/>04:00,43<br/>04:10,-1<br/>04:20,-1<br/>04:30,-1<br/>04:40,-1<br/>04:50,-1<br/>05:00,-1<br/>05:10,-1<br/>05:20,-1<br/>05:30,-1<br/>05:40,-1<br/>05:50,-1<br/>06:00,-1<br/>06:10,-1<br/>06:20,-1<br/>06:30,-1<br/>06:40,-1<br/>06:50,-1<br/>07:00,-1<br/>07:10,-1<br/>07:20,-1<br/>07:30,-1<br/>07:40,-1<br/>07:50,-1<br/>08:00,-1<br/>08:10,-1<br/>08:20,-1<br/>08:30,-1<br/>08:40,-1<br/>08:50,-1<br/>09:00,-1<br/>09:10,-1<br/>09:20,-1<br/>09:30,-1<br/>09:40,-1<br/>09:50,-1<br/>10:00,-1<br/>10:10,-1<br/>10:20,-1<br/>10:30,-1<br/>10:40,-1<br/>08:45,START<br/>09:00,END<br/>0,SNOOZES<br/></pre><br/>Note:
-1 is no data captured, -2 is ignore set, ALARM, START and END nodes
represent smart alarm actual, start and end<br/><br/><small>Please don't
reply, this is an unmonitored mailbox</small><br/></body></html>`;

var data = email2Json.parseEmail2Json(to,subject,body)[0];
var user = email2Json.parseEmail2Json(to,subject,body)[1];

//setUserData(data, user);
//registerUser("Test", "test@test.com", "test");