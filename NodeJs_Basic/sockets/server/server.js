const   net = require('net'); // Net [Socket] module
const   server = net.createServer(); // Create server
const   fs = require('fs');
const   path = require('path');
const   new_file = path.join(__dirname, 'new_data_received.txt');


server.listen(8080, () => { console.log('Server listening on port', server.address().port) }); // Listen on port 8080

server.on('connection', (socket) => // When the server connection its okay
{
    socket.on('data', (data) =>
    {
        // Client received data
        ft_write_file(data);

        // Response to client
        socket.write('\nData received [Server]');
    });

    socket.on('error', (err) => { if (err) throw (err) });
    
    socket.on('close', () =>
    {
        console.log('The client has left\n');
        return ;
    });

});

server.on('error', (err) =>
{
    if (err)
        throw err;
});

function ft_write_file(data)
{
    const   write_stream = fs.createWriteStream(new_file, 'utf-8', { flags: 'a' });
    write_stream.write(data);

    write_stream.on('error', (err) =>
    {
        console.log('Can\'t create a new book [No-data]');
        if (err)
            throw err
    });
    console.log("A new book has been created");
}
