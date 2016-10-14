var express = require('express');
var app = express();
app.get('/',function(request, response){
  response.send('hello express');
});
app.listen(3000, function(){
  console.log('Server Express Ready!');
});