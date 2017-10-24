var request = require("request");
var xml2json = require("simple-xml2json");


var upcArray = ['3400012383']



for (var temp = 0; temp < upcArray.length; temp++) 
{
  var options = 
   {
    method: 'GET',
    url: 'https://api.itemmaster.com/v2/item',
    qs: { upc: upcArray[temp], epf: '100', ef: 'png' },


    headers:
    {
      'cache-control': 'no-cache',
      password: 'Congerg18',
      username: 'cgeraghty'
    }
   };

    request(options, function (error, response, body) 
    {
      if (error) 
     {
      throw new Error(error);
      }
     else 
     {
      var jso = xml2json.parser(body);
        if (jso.items.item) 
        {
          if (jso.items.item.manufacturersuppliedcontentimages) 
          {
            if (jso.items.item.manufacturersuppliedcontentimages.medium) {
              console.log(jso.items.item.manufacturersuppliedcontentimages.medium.url);
              }
            else {
              // if no url value
              // check if the onject is an array
              if (typeof jso.items.item.media.medium.url == "string") 
                {
                console.log(jso.items.item.media.medium.url);
                }
                else
                {

                // assuming that it is an array
                console.log(jso.items.item.media.medium[0].url);
                }
              }

          }
          else 
          {
            // get the data from the media url
          }
        }
        else
        {
          console.log("ATTENTION! did not find URL tag "  + options.qs.upc);
        }
    }
  });
}

