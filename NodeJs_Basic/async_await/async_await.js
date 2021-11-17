const fs = require('fs');
const fsPromises = fs.promises;

class FileAsync
{
	/*** * @param {string} path Path of the file that will be opened * @returns {Promise<FileAsync>} */
	static async CreateFileAsync(path)
    {
		const file_handle = await fsPromises.open(path);
		const stats = await file_handle.stat(path);

		return new FileAsync(file_handle, stats);
	}
	
	/** * @classdesc Object that contains a handle to the underlying fd, and allows reading and seeking within the file * @param {number} fd File descriptor handle used by this FileAsync */
	constructor(file_handle, stats)
	{
		this.file = file_handle;
		this.file_stats = stats;
		this.pos = 0;
	}

    /** * Closes the underlying file descriptor. * Once this is called, no other methods in this class should be called * @returns {Promise<void>} */
    async close()
	{
		await this.file.close();
		console.log('> File closed [OK]');
		return ;
	}

    /** * Sets the cursor to the specified position within the file * @param {number} pos Target offset of the cursor */
	seek(pos)
	{
		if (pos < 0 || pos > this.file_stats.size || pos === undefined)
		{
			throw new Error('> Cursor position no avalaible');
		}
		else
		{
			this.pos = pos;
			console.log('> Cursor position established : ' + this.pos);
		}
	}

    /** * Reads data from the file to the user provided buffer, and advances the cursor according to the number of bytes read * @param {Buffer} buf  * @returns {Promise<number>} Promise that resolves with the number of bytes read */
    async read(buf)
	{
		let {bytesRead} = await this.file.read(buf, 0, buf.length, this.pos);
		this.pos += bytesRead;
		return bytesRead; // Return read bytes
	}

	/** * Reads data from the file from the cursor up to EOF * @returns {Promise<Buffer>} Data read from the file */
    async readToEnd()
	{
		let new_buff = Buffer.alloc(this.file_stats.size - this.pos);
		await this.file.read(new_buff, 0, new_buff.length, this.pos);
		return new_buff; // Return new buffer
	}
}

// Class instances
const file_manager_process = FileAsync.CreateFileAsync('./book.txt');

file_manager_process.then(ft_test);

async function ft_test(file)
{
/*************** SEEK CURSOR ********************/
	let cursor_pos = 0;
	file.seek(cursor_pos);

/***************** READ *************************/
	let buf = Buffer.allocUnsafe(50);
	let r_bytes = await file.read(buf);

	console.log('> R_bytes : ' + r_bytes);
	console.log('$$' + buf + '$');
	
/***************** READ TO END ******************/

	let new_buf = await file.readToEnd();
	console.log('$$' + new_buf.toString() + '$');
/******************** CLOSE *********************/

	file.close();
}
