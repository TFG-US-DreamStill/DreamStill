var fs, passwordFile;

passwordFile = 'passwords.json';
fs = require('fs');

var configuration = JSON.parse(
    fs.readFileSync(passwordFile)
);

var Imap = require('imap'),
    inspect = require('util').inspect;

var imap = new Imap({
  user: configuration["Gmail"].username,
  password: configuration["Gmail"].password,
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
});

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', function() {
  openInbox(function(err, box) {
    if (err) throw err;
    var f = imap.seq.fetch('6:8', {
        bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)','TEXT'],
      struct: true
    });
    f.on('message', function(msg, seqno) {
        console.log('Message #%d', seqno);
        var prefix = '(#' + seqno + ') ';
        msg.on('body', function(stream, info) {
          if (info.which === 'TEXT')
          var buffer = '', count = 0;
          stream.on('data', function(chunk) {
            count += chunk.length;
            buffer += chunk.toString('utf8');

            console.log("BUFFER", buffer);
          });
          stream.once('end', function() {
            if (info.which !== 'TEXT')
              console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
          });
        });
    });
    f.once('error', function(err) {
      console.log('Fetch error: ' + err);
    });
    f.once('end', function() {
      console.log('Done fetching all messages!');
      imap.end();
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