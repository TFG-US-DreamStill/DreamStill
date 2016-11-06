var email2Json = require('./email2Json.js');
var firebaseApi = require('./firebase.api.js');

var fs, passwordFile;

passwordFile = 'passwords.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(passwordFile)
);
// sample adapted from mail-listener2

var MailListener = require("mail-listener2");

var mailListener = new MailListener({
  username: configuration["Gmail"].username,
  password: configuration["Gmail"].password, // works for me: https://accounts.google.com/b/0/IssuedAuthSubTokens?hide_authsub=1
  host: "imap.gmail.com",
  port: 993, // imap port 
  tls: true,
  connTimeout: 10000, // Default by node-imap 
  authTimeout: 5000, // Default by node-imap, 
  debug: console.log, // Or your custom function with only one incoming argument. Default: null 
  tlsOptions: { rejectUnauthorized: false },
  /*mailbox: "INBOX", // mailbox to monitor 
  searchFilter: ["UNSEEN", "FLAGGED"], // the search filter being used after an IDLE notification has been retrieved 
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
  mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib. 
  attachments: true, // download attachments as they are encountered to the project directory 
  attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments */
});
//   tlsOptions: { rejectUnauthorized: false },
//   mailbox: "INBOX", // mailbox to monitor
//   searchFilter: "UNSEEN", // the search filter being used after an IDLE notification has been retrieved
//   markSeen: true, // all fetched email willbe marked as seen and not fetched next time
//   fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
//   mailParserOptions: {streamAttachments: true} // options to be passed to mailParser lib.
// });

mailListener.on("server:connected", function(){
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function(){
  console.log("imapDisconnected");
});

// this is where it starts to differ from the first sample

// A more complex example.
// Get the first 20 (UNSEEN) emails, mark them read (\SEEN), 
// and archive them.
(function () {
  // make sure you include in options:  
  //   fetchUnreadOnStart: true,
  var count = 0;

  mailListener.on("mail", function(mail, seqno, attributes) {
    var mailuid = attributes.uid,
      i = ++count;

    if (i > 20) {
      mailListener.stop(); // start listening
      return;
    }
    if (mail.from[0].address.indexOf("noreply@morpheuz.co.uk") !== -1){
      console.log('email parsed', { 
        i: i, 
        to: mail.to[0].address,
        subject: mail.subject, 
        body: mail.html,
        /*seqno: seqno, 
        uid: attributes.uid,
        attributes: attributes */
      });
      var data = email2Json.parseEmail2Json(mail.to[0].address, mail.subject, mail.html)[0];
      var user = email2Json.parseEmail2Json(mail.to[0].address, mail.subject, mail.html)[1];

      firebaseApi.setUserData(data, user);

      console.log('attempting to mark msg read/seen');
      mailListener.imap.addFlags(mailuid, '\\Seen', function (err) {
        if (err) {
          console.log('error marking message read/SEEN');
          return;
        }
      });
    }
  });
})();


mailListener.start(); // start listening

// When testing this script with GMail in US it took about 
// 8 seconds to get unread email list, another 40 seconds 
// to archive those 20 messages (move to All Mail).
