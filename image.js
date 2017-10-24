const download = require('image-downloader')
var ASQ = require('asynquence');
var asq_contrib = require('asynquence-contrib');
var fs = require('fs');

var array1 = [];
var array2 = [];

function dig()
{
    var sq = ASQ();
    sq.then(function(done,content) {
        
    })

    return sq;
}

function downloadImage(urlName)
{
    var sq = ASQ();
    sq.then(function(done,contents) {

        var dsds = fs.readFileSync('./upcFolder/mediaTag.txt');
      //  console.log(dsds.toString().split("\n").length);
        array1 = dsds.toString().split("\n");

        for(var temp=0;temp<array1.length;temp++)
        {
            array2 = array1[temp].split("-> ");
            console.log(array2.length);
       
        for(var temp2=0;temp2<array2.length-1;temp2++)
        {
            
            const options = {
                url: urlName,
                dest: './upcFolder2',
                data: 'array2[1]  '                // Save to /path/to/dest/image.jpg
              }

               var ss = array2[1];
               
              download.image(options)
                .then(({ filename, image }) => {
                  console.log('File saved to', filename)
                  console.log('URL  ' + options.data);
                  fs.renameSync("./" + filename, "./upcFolder2/"  + options.data  +".jpg");
                  done(filename);
                }).catch((err) => {
                  throw err
                });
        }
        
        }     
    });

    return sq;
    
       
}


function downloadImage2(urlName)
{
    var sq = ASQ();
    sq.then(function(done,contents) {

        var dsds = fs.readFileSync('./upcFolder/mediaTag.txt');
        console.log(dsds.toString().split("\n").length);
      //  array1 = dsds.toString().split("\n");


       

            
            const options = {
                url: urlName,
                dest: './upcFolder',
                data: 'sample'                // Save to /path/to/dest/image.jpg
              }

               var ss = array2[1];
               
              download.image(options)
                .then(({ filename, image }) => {
                  console.log('File saved to', filename)
                  console.log('URL  ' + options.data);
                  fs.renameSync("./" + filename, "./upcFolder/"  + options.data  +".jpg");
                  done(filename);
                }).catch((err) => {
                  throw err
                });
  //      }
        
 //       }     
    });

    return sq;
    
       
}



downloadImage2('http://media.itemmaster.com/0/0/0/519/41c64af4-8a73-44ce-9179-ce0b750ff0b5.png?originalFormat=tif&tkn=f476d250-08da-11e7-8bed-0242329a0588&amp;size=100x100').
val(function(contents) {
    console.log( "!!" + contents);
    
})