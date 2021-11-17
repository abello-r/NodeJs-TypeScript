const   net = require('net'); // Net [Socket] module
const   fs = require('fs'); // File System [Read] module
const   path = require('path');
const   PATH_FILE =  path.join(__dirname, "book.txt");

const   options =
{
    port: 8080,
    host: 'localhost'
}

ft_send_package();

function ft_send_package()
{
    let socket_client = net.createConnection(options);
    let STREAM = fs.createReadStream(PATH_FILE, 'utf-8', { autoClose: true });
    let check_data = false;
    
    STREAM.once('data', () => // Event [ONCE] is executed when data is received for first time
    {
        check_data = true;
    });

    STREAM.on('data', (line) => // Event [on] is executed when data is received.
    {
        socket_client.on('connect', () =>
        {
            console.log('Conection established');
            socket_client.write(line);
        });
    });

    STREAM.on('end', () => // Event [END] is executed when all data has already been received
    {
        if (check_data === false)
            console.log("\nNo data received\n");
    });

    socket_client.on('error', (err) =>
    {
        if (err)
            throw err;
    });
}
