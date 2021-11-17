const   path = require('path');
const   fs = require('fs');
const   PATH_FILE =  path.join(__dirname, "bible.txt");

let stream = fs.createReadStream(PATH_FILE, { autoClose: true }); // Save the entire stream
let check = 0;

let max_len = fs.statSync(PATH_FILE);
let buff = Buffer.allocUnsafe(max_len.size);
let offset = 0; 

stream.once('ready', () => // Event [ONCE] is executed when data is received for first time
{
    console.log('\nStart stream\n');
    check = 1;
});

stream.on('data', (chunk) => // Event [on] is executed when data is received.
{
    chunk.copy(buff, offset);
    offset += chunk.length;
}); 

stream.on('end', () => // Event [END] is executed when all data has already been received
{
    if (check == 0)
        console.log("\nNo data received\n");
    else
    {
        let lines = buff.toString().split('\n');
    
        for (const line of lines)
            console.log(line);
    }
});
