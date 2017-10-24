var async = require('async');
var fs = require('fs');
var http = require('http');

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
            console.log(rbfa);
            array1.push(rbfa);
        }
    }
}



for(var temp5=0;temp5<(array1.length)/2;temp5++)
{
    array2.push(array1[temp5]);
}







var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
      response.pipe(file);
      file.on('finish', function() {
        file.close();
        cb();
      });
    });
  }
  var array8 = [];
  var array9 = [];
  var array5 = [];
  var array5Read = fs.readFileSync('./output/urls2.txt');
  array5Read = array5Read.toString();
  array5 = array5Read.split('\n');

  for(array5Single of array5)
  {
    array8.push(array5Single.split(',')[0]);
    array9.push(array5Single.split(',')[1]);
  }
  
  console.log("array8 " + array8);

  var i = 0, threads = 200;
  require('async').eachLimit(array8, threads, function(url, next){
    //console.log(url + " " + array6[i++]);
    if(!url.includes("https"))
    {
        var sdd = array9[i++];
        console.log(typeof sdd)
        sdd =sdd.toString();
        download(url, "./imagenotfound/" + sdd + ".jpg", next);
    }
    
  }, function(){
     console.log('finished');
  });



