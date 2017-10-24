var async = require('async');
var fs = require('fs');
var http = require('http');


var array1 = [];
var array2 = [];
var array3 = [];
var array4 = [];
var array5 = [];
var array6 = [];


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

  //download('http://media.itemmaster.com/0/0/0/469/1ba7f9c4-1963-44d2-942c-fa779a9d75d3.png?originalFormat=tif&tkn=f476d250-08da-11e7-8bed-0242329a0588&size=100x100','./upcFolder/assssss.jpg',function() {
  //    console.log("asaa");
  //})


  var as1 = fs.readFileSync('./upcFolder/mediaTag2.txt');
  as1 = as1.toString();
  array3 = as1.split('\n');
  for(var temp2=0;temp2<array3.length;temp2++)
  {
      if(!array3[temp2].includes('undefined') == true)
      {
       array4 = array3[temp2].split('-> ');
        for(var temp3=0;temp3<array4.length-1;temp3++)
        {
            array5.push(array4[0]);  // url array
            array6.push(array4[1]); // upc array



        }
    }
  }

  console.log(array5.length);
  console.log(array6.length);

  
  var photourl = [
      '/Users/vigneshkarthikeyan 1/Desktop/vickyexample/MediaTagImages/3400000221.jpg'
  ]

  var i = 0, threads = 400;
  require('async').eachLimit(array5, threads, function(url, next){
    //console.log(url + " " + array6[i++]);
    download(url, "./upcFolder3/" + array6[i++]+".jpg", next);
  }, function(){
     console.log('finished');
  })


 // var i = 1, threads = 5;
 // require('async').eachLimit('http://media.itemmaster.com/0/0/0/319/833046fb-5c79-4ebb-9146-0e2286db3f45.png?originalFormat=tif&tkn=f476d250-08da-11e7-8bed-0242329a0588&amp;size=100x100', threads, function(url, next){
 //   download(url, "./upcFolder/file"+(i++)+".jpg", next);
 // }, function(){
 //    console.log('finished');
 // })