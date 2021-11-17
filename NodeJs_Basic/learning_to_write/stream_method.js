const   fs = require('fs');
const   path = require('path');
const   new_file = path.join(__dirname, 'stream_book.txt');
const   writeStream = fs.createWriteStream(new_file, { flags: 'a' }); // Create write stream

const periodic = setInterval(function()
{
    join_text();
}, 3000); // Periodic time in ms

function join_text()
{
    let iso_time = new Date().toISOString().slice(0, 10);
    writeStream.write('\n' + iso_time); // Write

    writeStream.on('error', err => // Error manager
    {
        console.log("Ha ocurrido un error en la escritura del archivo\n", { err });
    });

    console.log("Successful task");
}
