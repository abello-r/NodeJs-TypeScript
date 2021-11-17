const	fs = require('fs');

class File
{
	/**
	 * @classdesc Object that contains a handle to the underlying fd, and allows reading and seeking within the file
	 * @param {string} path Path of the file that will be open
	 */
	constructor(path)
	{
		this.path = path;
		this.pos = 0;

		this.new_position = 0;

		this.file_stat = fs.statSync(this.path);
		this.max_cursor_pos = this.file_stat.size;
		this.file_descriptor = fs.openSync(this.path, 'r');
	}
	close()
	{
		fs.closeSync(this.file_descriptor);
		console.log('> File has been closed');
	}
	/**
	 * Sets the cursor to the specified position within the file
	 * @param {number} pos Target offset of the cursor
	 */
	seek(pos)
	{
		if (pos < 0 || pos > this.max_cursor_pos)
			throw new Error('> Cursor position no avalaible');
		else
		{
			this.pos = pos;
			console.log('> Cursor position established : ' + this.pos);
		}
	}
	/**
	 * Reads data from the file to the user provided buffer, and advances the cursor according to the number of bytes read
	 * @param {Buffer} buf 
	 * @returns {number} Number of bytes read
	 */
	read(buf)
	{
		let r_bytes = fs.readSync(this.file_descriptor, buf, 0, buf.length, this.pos);
		this.pos += r_bytes;
		return (r_bytes);
	}
	/**
	 * Reads data from the file from the cursor up to EOF
	 * @returns {Buffer} Data read from the file
	 */
	readToEnd()
	{
		let new_buff = Buffer.alloc(this.max_cursor_pos - this.pos);
		let r_bytes = fs.readSync(this.file_descriptor, new_buff, 0, new_buff.length, this.pos);
		return (new_buff);
	}
}

// Class instances
	const file_manager = new File('./book.txt');

// Seek method
	let	pos = 0;
	file_manager.seek(pos);

// Read method
	let buf = Buffer.allocUnsafe(100).fill(0);
	let r_bytes = file_manager.read(buf);
	console.log('$' + buf.toString() + '$');
	console.log('> R-bytes = ' + r_bytes);

// Read to end
	let total_buf = file_manager.readToEnd();
	console.log('$' + total_buf.toString() + '$');
	
// Close method
	file_manager.close();