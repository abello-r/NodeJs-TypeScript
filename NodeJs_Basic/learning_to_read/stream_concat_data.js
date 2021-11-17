const   path = require('path');
const   fs = require('fs');
const   PATH_FILE =  path.join(__dirname, "bible.txt");

let stream = fs.createReadStream(PATH_FILE, { highWaterMark : 1024 }); // Save the entire stream
let check = 0;

let max_len = fs.statSync(PATH_FILE);
let buff = Buffer.allocUnsafe(max_len.size);
let	old_line_len = 0;


stream.once('ready', () => // Event [ONCE] is executed when data is received for first time
{
	check = 1;
	console.log('Start stream');
});

stream.on('data', (chunk) => // Event [on] is executed when data is received.
{
	if (old_line_len > 0) // First look the while
	{
		chunk = Buffer.concat([buff.slice(0, old_line_len), chunk]); // old_line + new_chunk
		old_line_len = 0;
	}

	let nl_position;
	while ((nl_position = chunk.indexOf('\n')) > -1) // Save n bytes
	{
		let static_line = chunk.toString("utf8", 0, nl_position); // transform to string from 0 to nl 
		chunk = chunk.slice((nl_position + 1)); // Chunk start = nl_position + 1
		console.log(static_line);
	}

	if (chunk.length > 0) // Garbage line?
	{
		old_line_len = chunk.copy(buff, 0); // Lenght garbg line
	}

});

stream.on('end', () => // Event [END] is executed when all data has already been received
{
	if (check == 0)
		console.log("\nNo data received\n");

	console.log("End stream");
});
