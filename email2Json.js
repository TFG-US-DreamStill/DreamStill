module.exports = {

    parseEmail2Json: function(to, subject, body) {
        var emailArray = body.split("<pre>");
        var emailSleepData = emailArray[1].split("<br/>");
        var sleepData = [];
        var result = [];
        for (var temp of emailSleepData) {
            temp = "" + temp;
            if (temp.indexOf("</pre>") !== -1) {
                break;
            }
            sleepData.push(temp);

        }
        //var reId = "dreamstillapp\+.*@gmail.com";
        var id = to.split("+")[1].split("@")[0];
        //var reDate = "Morpheuz-[0-9]{4}-[0-9]{2}-[0-9]{2}";
        var date = subject.replace("Morpheuz-", '');
        if (sleepData.length > 0) {
            json = "{\"" + date + "\":[";
            var temp;
            for (var i = 0; i < sleepData.length; i++) {
                if (i !== sleepData.length - 1) {
                    temp = sleepData[i].split(",");
                    json += "{" + "\"Hour\":\"" + temp[0] + "\",\"Movements\":\"" + temp[1] + "\"},";
                } else {
                    json += "{" + "\"Hour\":\"" + temp[0] + "\",\"Movements\":\"" + temp[1] + "\"}";
                }
            }
            json += "]}";
        }
        result.push(json);
        result.push(id);

        return result;
    }
};

//console.log(parseEmail2Json(message));