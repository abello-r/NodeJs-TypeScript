const fs = require('fs');

class FileAsync
{
    /** @param {string} path Path of the file that will be opened  @returns {Promise<FileAsync>} **/
    static CreateFileAsync(path)
	{
		
		let get_fd = new Promise(function(resolve, reject)
		{
			fs.open(path, (err, fd) =>
			{
				if (err)
					reject(err);
				else
					resolve(fd);
			});
		});
		
		let file = get_fd.then((success_fd) =>
		{
			return new Promise(function(resolve, reject)
			{
				fs.fstat(success_fd, (err, stats) =>
				{
					if (err)
						reject(err);
					else
						resolve(new FileAsync(success_fd, stats));
				});
			});
		});
		return (file);
	}

	/** @classdesc Object that contains a handle to the underlying fd, and allows reading and seeking within the file @param {number} fd File descriptor handle used by this FileAsync */
    constructor(fd, stats)
	{
		this.file_descriptor = fd;
		this.file_stats = stats;
		this.pos = 0;
	}

	/** Sets the cursor to the specified position within the file * @param {number} pos Target offset of the cursor */
	seek(pos)
	{
		const max_cursor_pos = this.file_stats.size;

		if (pos < 0 || pos > max_cursor_pos)
			throw new Error('> Cursor position no avalaible');
		else
		{
			this.pos = pos;
			//console.log('> Cursor position established : ' + this.pos);
		}
	}

    /**
     * Reads data from the file to the user provided buffer, and advances the cursor according to the number of bytes read
     * @param {Buffer} buf 
     * @returns {Promise<number>} Promise that resolves with the number of bytes read
     */
	 read(buf)
	{
		return new Promise((resolve, reject) =>
		{
			fs.read(this.file_descriptor, buf, 0, buf.length, this.pos, (err, r_bytes, buffer) =>
			{
				// Buffer value is saved on buf param
				if (err)
					reject(err);
				else
				{
					this.pos += r_bytes;
					resolve(r_bytes);
				}
			});
		});
	}

	/** Reads data from the file from the cursor up to EOF * @returns {Promise<Buffer>} Data read from the file */
	readToEnd()
	{
		let new_buff = Buffer.alloc(this.file_stats.size - this.pos);

		return new Promise( (resolve, reject) =>
		{
			fs.read(this.file_descriptor, new_buff, 0, new_buff.length, this.pos, (err, r_bytes, buffer) =>
			{
				if (err)
					reject(err);
				else
					resolve(new_buff);
			});
		});
	}

	/** Closes the underlying file descriptor. * Once this is called, no other methods in this class should be called * @returns {Promise<void>} */
	close()
	{
		return new Promise( (resolve, reject) =>
		{
			fs.close(this.file_descriptor, (err) =>
			{
				if (err)
					reject('Failed to close file', err);
				else
				{
					console.log("> File Closed successfully");
				  	resolve(null);
				}
			});
		});
	}
}

module.exports = {
	class: FileAsync
};
