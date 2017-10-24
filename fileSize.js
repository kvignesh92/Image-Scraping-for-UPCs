var fs = require('fs');
var http = require('http');

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

var i = 0;
var fileArray = [];
var resultSet = [];
var array3 = [];
var array4 = [];
var array5 = [];
var array6 = [];
// Read media tag file 
var readFileUSe = fs.readFileSync('./upcFolder/mediaTag.txt');
readFileUSe = readFileUSe.toString();
fileArray = readFileUSe.split('\n');

var gs = fs.readdirSync('./upcFolder3/');
console.log(gs.length);
for(var fg of gs)
{
 //   console.log(fg);
    const stats = fs.statSync("./upcFolder3/" + fg);
    const fileSizeInBytes = stats.size
   // console.log(fileSizeInBytes);
    if(fileSizeInBytes == 0)
    {
        i++;



        for(var fileSingle of fileArray)
        {
            if (fileSingle.includes(fg.replace('.jpg','')) == true)
            {   
                resultSet.push(fileSingle);
            } 
        }
    }
}

console.log(i);

console.log(resultSet.length);

//console.log(resultSet);

//array3 = resultSet.split('\n');
for(var temp2=0;temp2<resultSet.length;temp2++)
{

     array4 = resultSet[temp2].split('-> ');
      for(var temp3=0;temp3<array4.length-1;temp3++)
      {
          array5.push(array4[0]);  // url array
          array6.push(array4[1]); // upc array



      }
 // }
}


// send the result set to the retrieve images...





var i = 0, threads = 500;
require('async').eachLimit(array5, threads, function(url, next){
  //console.log(url + " " + array6[i++]);
  download(url, "./upcFolder3/" + array6[i++]+".jpg", next);
}, function(){
   console.log('finished');
});






