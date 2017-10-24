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

        var dsds = fs.readFileSync('./upcFolder/mediaTag2.txt');
      //  console.log(dsds.toString().split("\n").length);
        array1 = dsds.toString().split("\n");

        for(var temp=0;temp<array1.length;temp++)
        {
            array2 = array1[temp].split("-> ");
            console.log(array2.length);
       
        for(var temp2=0;temp2<array2.length-1;temp2++)
        {
            
            const options = {
                url: array2[temp2],
                dest: './upcFolder',
                data: array2[1]                  // Save to /path/to/dest/image.jpg
              }

               var ss = array2[1];
               
              download.image(options)
                .then(({ filename, image }) => {
                  console.log('File saved to', filename)
                  console.log('URL  ' + options.data);
                  fs.renameSync("./" + filename, "./MediaTagImages/"  + options.data  +".jpg");
                  done(filename);
                }).catch((err) => {
                  throw err
                });
        }
        
        }     
    });

    return sq;
    
       
}



downloadImage('http://media.itemmaster.com/I/0/0/0/6/5ceda3e5-a880-4c26-b7d1-c0e2ecc4b1d5.jpg?tkn=f476d250-08da-11e7-8bed-0242329a0588').
val(function(contents) {
    console.log( "!!" + contents);
    
})
