
var gis = require('g-i-s');
var fs = require('fs');
var async = require('async');

var array1 = [];
var array2 = [];
var bast = [];
var i =0;

var readInactiveRecords = fs.readFileSync('./upcFolder/contentUnavailable.txt');
readInactiveRecords = readInactiveRecords.toString();
readInactiveRecordsArray = readInactiveRecords.split('\n');
console.log(readInactiveRecordsArray.length);

// read the bigger file..



var readBiggerFile = fs.readFileSync('./Workbook4.txt');
readBiggerFile = readBiggerFile.toString();



readBiggerFileArray = readBiggerFile.split('\n');
console.log(readBiggerFileArray.length);

// iterate through the file...

for(var riac of readInactiveRecordsArray)
{
    for(rbfa of readBiggerFileArray)
    {
        if(rbfa.includes(riac+","))
        {
         //   console.log(rbfa);
            array1.push(rbfa);
        }
    }
}



for(var temp5=0;temp5<(array1.length)/2;temp5++)
{
    array2.push(array1[temp5]);
}


console.log(array2);

threads = 9000;
require('async').eachLimit(array2,
    
    threads, function(url, next){
   // console.log(url + " ");
    bast = url.split(',');
//    console.log(bast[1]);
     gis(bast[1] + " " + bast[0], logResults);
    //download(url, "./upcFolder3/" + array6[i++]+".jpg", next);
  }, function(){
     console.log('finished');
  })










function logResults(error, results) {
  if (error) {
    console.log("error from logs "+ error);
  }
  else {
    if(results[0])
    {
        if(results[0].url)
        {
         //   console.log(results[0].url);
         //   console.log("asdsadsd");
            console.log(results);
            fs.appendFileSync('./output/urls2.txt',results[0].url+ '\n');
        }  
    }
    else{
        console.log("issue@ " + results);
    }  
    
    

  }
}