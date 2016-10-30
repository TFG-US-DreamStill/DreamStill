import { Injectable }   from '@angular/core';

@Injectable()
export class Csv2JsonService{

    parseCsv2Json(fecha: String, sleepData: String): String{
        var EmailArray = sleepData.split("\n");
        var csvData: String[];
        var parseDate: String;
        var result: String;
        result = ""
        parseDate = fecha.replace("Morpheuz-",'');
        csvData = [];
        for(let temp of EmailArray){
            if(temp.indexOf("Note:") !== -1){
                break;
            }
            if(temp.indexOf(",") !== -1){
                temp = temp.replace(/ /g,'');
                csvData.push(temp);
            }
        }
        if(csvData.length>0){
            result = "{\""+parseDate+"\":[";
            var temp: String[];
            for(var i = 0; i < csvData.length; i++){
                if(i !== csvData.length-1){
                   temp =  csvData[i].split(",");
                   result += "{"+"\"Hour\":\""+temp[0]+"\",\"Movements\":\""+temp[1]+"\"},";   
                }else{
                   result += "{"+"\"Hour\":\""+temp[0]+"\",\"Movements\":\""+temp[1]+"\"}";  
                } 
            }
            result += "]}";
        }
        
        //console.log(ExampleArray);
        console.log(csvData);
        console.log(parseDate);

        return result;
    }
}