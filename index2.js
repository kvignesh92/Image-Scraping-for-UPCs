var request = require("sync-request");
var xml2json = require("simple-xml2json");
var asyncLoop = require('node-async-loop');
var xml2json = require("simple-xml2json");
var fs = require('fs');
const download = require('image-downloader')

   var fileData = fs.readFileSync('./input/input.txt');
   fileData = fileData.toString();
   var upcArray = []
   upcArray = fileData.split('\n');

 console.log(upcArray.length);
 //  console.log(fileData.toString());
  // var upcArray = ['4300020552', '4300020553', '4300020554', '4300020555', '4300020556', '4300020559', '4300020581', '4300020636', '4300020637', '4300020638', '4300020651', '4300020652', '4300020653', '4300020812', '4300021200', '4300021363', '4300021710', '4300021718', '4300021790', '4300022802', '4300025071', '4300025220', '4300025908', '4300026902', '4300026906', '4300027678', '4300028521', '4300028532', '4300028543', '4300028555', '4300028588', '4300028589', '4300028591', '4300028592', '4300028594', '4300028681', '4300028930', '4300029106', '4300029320', '4300029322', '4300034057', '4300070214', '4300070590', '4300070992', '4300071602', '4300079389', '4300079460', '4300079830', '4300094502', '4300094509', '4300094511', '4300094520', '4300094963', '4300094964', '4300095016', '4300095019', '4300095023', '4300095025', '4300095028', '4300095051', '4300095054', '4300095064', '4300095117', '4300095265', '4315203123', '4315203127', '4315203323', '4318200091', '4318200092', '4318200098', '4318200208', '4318200209', '4318200352', '4318200520', '4300095271', '4300095350', '4300095352', '4300095353', '4300095354', '4300095368', '4300095369', '4300095370', '4300095373', '4300095527', '4300095531', '4300095543', '4300095547', '4300095561', '4300095562', '4300095563', '4300095567', '4300095569', '4300095570', '4300096726', '4300097825', '4300097868', '4300097903', '4300097920', '4300097940', '4300098198', '4300099587', '4300099592', '4312607184', '4315200900', '4318200528', '4318200852', '4318200854', '4318200855', '4318200857', '4318200868', '4318200890', '4318200891', '4319210600', '4319231550', '4330130581', '4330137000', '4342700681', '4342700682', '4322200021', '4322200041', '4322200101', '4322210110', '4322260090', '4322270075', '4323621952', '4323621954', '4323621957', '4323621963', '4323621974', '4323621981', '4326880002', '4330161111', '4330161140', '4335400720', '4335400725', '4342700184']
  // var upcArray = ['1111534004']

//var upcArray =['3400012380'];
var request = require('sync-request');


  

    for(var temp=0;temp<upcArray.length;temp++) 
    {
        var res = request('GET', 'https://api.itemmaster.com/v2/item', {
            'headers': {
               password: 'Congerg18',
               username: 'cgeraghty'
            },
            qs: { upc: upcArray[temp], epf: '100', ef: 'png' }
            
          });
          try{
            var jso = xml2json.parser(res.getBody().toString());
          
          
  //        if(jso.items)
  //        {
          if (jso.items.item) 
          {
            if (jso.items.item.manufacturersuppliedcontentimages) 
            {
              if (jso.items.item.manufacturersuppliedcontentimages.medium) {
                if(typeof jso.items.item.manufacturersuppliedcontentimages.medium.url == "string")
                {
                    console.log(jso.items.item.manufacturersuppliedcontentimages.medium.url);
                    fs.appendFileSync('./upcFolder/manufacturedSuppliedTag.txt',jso.items.item.manufacturersuppliedcontentimages.medium.url + "-> " + upcArray[temp] + '\n');
             //      downloadImage(jso.items.item.manufacturersuppliedcontentimages.medium.url);
                }
                else{
                    // it is an array
                    console.log(jso.items.item.manufacturersuppliedcontentimages.medium[0].url);
                    fs.appendFileSync('./upcFolder/manufacturedSuppliedTag.txt',jso.items.item.manufacturersuppliedcontentimages.medium[0].url + "-> " + upcArray[temp] + '\n');
             //      downloadImage(jso.items.item.manufacturersuppliedcontentimages.medium.url);
                }

                }
              else {
                // if no url value and no medium
                // check if the onject is an array
                if(jso.items.item.media.medium)
                {
                if (typeof jso.items.item.media.medium.url == "string") 
                  {
                  console.log(jso.items.item.media.medium.url);
                  
                  fs.appendFileSync('./upcFolder/mediaTag.txt',jso.items.item.media.medium.url + "-> " + upcArray[temp] + '\n');

                  }
                  else
                  {
    
                  // assuming that it is an array
                  console.log(jso.items.item.media.medium[0].url);
                  fs.appendFileSync('./upcFolder/mediaTag.txt',jso.items.item.media.medium.url + "-> " + upcArray[temp] + '\n');
                  }
                }
                else
                {
                    console.log("ATTENTION! did not find URL tag in media "  + upcArray[temp]);
                    fs.appendFileSync('./upcFolder/contentUnavailable.txt',"ATTENTION! did not find URL tag in media "  + upcArray[temp] + '\n');
                }
                }
    
            }
            else 
            {
              // get the data from the media url
            }
          }
  //      }
          else
          {
            console.log("ATTENTION! did not find any content "  + upcArray[temp]);
            fs.appendFileSync('./upcFolder/contentUnavailable.txt',"ATTENTION! did not find any content "  + upcArray[temp] + '\n');
          }
        }
        catch (e)
        {
            console.log("ERROR PARSING " + upcArray[temp]);
        }
    }

    function downloadImage(urlName)
    {
        console.log('URL  ' + urlName);
        const options = {
            url: urlName,
            dest: './upcFolder'                  // Save to /path/to/dest/image.jpg
          }
           
          download.image(options)
            .then(({ filename, image }) => {
              console.log('File saved to', filename)
            }).catch((err) => {
              throw err
            })
           
    }


    function di(photourl)
    {
        var i = 1, threads = 5;
        require('async').eachLimit(photourl, threads, function(url, next){
            download(url, "./upcFolder"+(i++)+".jpg", next);
          }, function(){
             console.log('finished');
          })
    }