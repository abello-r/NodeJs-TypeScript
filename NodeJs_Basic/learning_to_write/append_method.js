const   fs = require('fs');
const   path = require('path');
const   new_file = path.join(__dirname, 'append_book.txt');


const periodic = setInterval(function()
{
    append_text();
}, 3000); // Periodic time in ms

function append_text()
{
    let iso_time = new Date().toISOString().slice(0, 10);

    fs.appendFile(new_file, '\n' + iso_time, { autoClose: true }, (err) => // Open the file, and appen the value [process_iso_time]
    {
        if (err)
            throw err;
        else
            console.log("Successful task");
    }); 

}
