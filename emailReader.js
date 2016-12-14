require('dotenv').config()

var email2Json = require('./email2Json.js');
var firebaseApi = require('./firebase.api.js');
var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: process.env.GMAIL_USERNAME,
  password: process.env.GMAIL_PASSWORD,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
});

function openInbox(cb) {
  imap.openBox('INBOX', false, cb);
}

imap.once('ready', function() {
  openInbox(function(err, box) {
  if (err) throw err;
  imap.search([ 'UNSEEN', ['FROM', 'noreply@morpheuz.co.uk'] ], function(err, results) {
    try{
    var f = imap.fetch(results,  {
        bodies: ['HEADER.FIELDS (TO SUBJECT)','TEXT'],
      struct: true,
      markSeen: true
    });
    }catch(Exception){
      imap.end();
    }
    if(f!==undefined){
      f.on('message', function(msg, seqno) {
        console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
        var buffer = '';
        msg.on('body', function(stream, info) {
          console.log(prefix + 'Body');
          //stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
          stream.on('data', function(chunk) {
              buffer += chunk.toString('utf8');
                if(buffer.includes("To:")){
                  const regexBody = /<html>(.*)<\/html>/;
                  const regexTo = /To: (.*)m/;
                  const regexSubject = /Subject: (.*)/;
                  //console.log("BUFFER", buffer);
                  buffer = buffer.replace(/(\r\n|\n|\r)/gm,"");
                  /*console.log("TO: "+String(regexTo.exec(buffer)[0]).replace(/To: /,""))
                  console.log("SUBJECT: "+String(regexSubject.exec(buffer)[0]).replace(/Subject: /,""))
                  console.log("BODY: "+regexBody.exec(buffer))*/
                  var to = String(regexTo.exec(buffer)[0]).replace(/To: /,"");
                  var subject = String(regexSubject.exec(buffer)[0]).replace(/Subject: /,"");
                  var body = String(regexBody.exec(buffer));
                  console.log(email2Json.parseEmail2Json(to, subject, body));

                  var data = email2Json.parseEmail2Json(to, subject, body)[0];
                  var user = email2Json.parseEmail2Json(to, subject, body)[1];

                  firebaseApi.setMorpheuzUserData(data, user);
                }
            });
        });
        msg.once('end', function() {
          console.log(prefix + 'Finished');
        });
      });
      f.once('error', function(err) {
        console.log('Fetch error: ' + err);
      });
      f.once('end', function() {
        console.log('Done fetching all messages!');
        imap.end();
      });
    }
  });
});
});

imap.once('error', function(err) {
  console.log(err);
});

imap.once('end', function() {
  console.log('Connection ended');
});

imap.connect();