function vicky(name,cb)
{
    if(!isNaN(name))
    {
        cb("Cannot pass in a number",null);
    }
    else
    {
    if(name == "Vicky")
    {
        console.log("Vicky was passed in!");
        cb(null,name);
    }
    else{
        console.log("Vicky was NOT passed in!");
        cb(null,name);
    }
}

    
}

vicky(122112,function(error,name) {
    if(error)
    {
        console.log("Err " + error );
        
    }
    else{
        console.log(name);
    }
});