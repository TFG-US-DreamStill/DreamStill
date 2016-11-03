var message = `
                <html><body><h2>Chart Display</h2><a
                href='http://ui.morpheuz.net/morpheuz/view-46.html?base=1478125246000&fromhr=08&tohr=09&frommin=45&tomin=00&smart=Y&vers=46&goneoff=0850&token=7abbac9e47999d4ef5a44b1e59ebaeee&age=21&emailto=dreamstillapp%2b18@gmail.com&noset=Y&zz=0&lat=37.4&long=-6.0&fault=0&graphx=76407303403f0363b203503a0b429859c3b626805403a04905638a33703a3910301d403314a03843f1e01f94e30440410c604a4a80303a82b303f40a4d132725348609704303848d3ee35d42d439ffd1727903a131dfffffffff'>Report</a><br/><h2>CSV
                Sleep
                data</h2><pre>23:20,1892<br/>23:30,115<br/>23:40,52<br/>23:50,63<br/>00:00,54<br/>00:10,946<br/>00:20,53<br/>00:30,58<br/>00:40,180<br/>00:50,664<br/>01:00,1436<br/>01:10,950<br/>01:20,616<br/>01:30,84<br/>01:40,58<br/>01:50,73<br/>02:00,86<br/>02:10,906<br/>02:20,823<br/>02:30,58<br/>02:40,913<br/>02:50,48<br/>03:00,468<br/>03:10,51<br/>03:20,330<br/>03:30,56<br/>03:40,1087<br/>03:50,480<br/>04:00,505<br/>04:10,1251<br/>04:20,68<br/>04:30,65<br/>04:40,198<br/>04:50,74<br/>05:00,1192<br/>05:10,48<br/>05:20,936<br/>05:30,691<br/>05:40,63<br/>05:50,1034<br/>06:00,1233<br/>06:10,807<br/>06:20,595<br/>06:30,1158<br/>06:40,151<br/>06:50,67<br/>07:00,56<br/>07:10,1165<br/>07:20,1006<br/>07:30,861<br/>07:40,1069<br/>07:50,1081<br/>08:00,4093<br/>08:10,370<br/>08:20,1936<br/>08:30,929<br/>08:40,797<br/>08:50,-1<br/>09:00,-1<br/>09:10,-1<br/>08:45,START<br/>09:00,END<br/>08:50,ALARM<br/>0,SNOOZES<br/></pre><br/>Note:
                -1 is no data captured, -2 is ignore set, ALARM, START and END nodes
                represent smart alarm actual, start and end<br/><br/><small>Please don't
                reply, this is an unmonitored mailbox</small><br/></body></html>

                BUFFER undefinedTo: dreamstillapp+18@gmail.com                                                                                                                                                                
                Subject: Morpheuz-2016-11-02                                                                                                                                                                                  
                From: Morpheuz <noreply@morpheuz.co.uk>                                                                                                                                                                       
                Date: Thu, 03 Nov 2016 06:00:47 -0600  
                `

function parseEmail2Json(message){
        var emailArray = message.split("<pre>");
        var emailSleepData = emailArray[1].split("<br/>");
        var sleepData = [];
        var result = [];
        for(let temp of emailSleepData){
            temp = ""+temp;
            if(temp.indexOf("</pre>") !== -1){
                break;
            }
            sleepData.push(temp);
            
        }
        emailSleepDataString = ""+emailSleepData;
        var reId = "dreamstillapp\+.*@gmail.com";
        var id = emailSleepDataString.match(reId)[0].split("+")[1].split("@")[0];
        var reDate = "Morpheuz-[0-9]{4}-[0-9]{2}-[0-9]{2}";
        var date = emailSleepDataString.match(reDate)[0].replace("Morpheuz-",'');
        if(sleepData.length>0){
            json = "{\""+date+"\":[";
            var temp;
            for(var i = 0; i < sleepData.length; i++){
                if(i !== sleepData.length-1){
                   temp =  sleepData[i].split(",");
                   json += "{"+"\"Hour\":\""+temp[0]+"\",\"Movements\":\""+temp[1]+"\"},";   
                }else{
                   json += "{"+"\"Hour\":\""+temp[0]+"\",\"Movements\":\""+temp[1]+"\"}";  
                } 
            }
            json += "]}";
        }
        
        result.push(json);
        result.push(id);

        return result;
}

console.log(parseCsv2Json(message));