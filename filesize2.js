var fs = require('fs');

var i = 0;

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


    }
}

console.log(i);
