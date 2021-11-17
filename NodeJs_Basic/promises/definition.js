class FileAsync{
    /**
     * 
     * @param {string} path Path of the file that will be opened
     */
    static CreateFileAsync(path)
    /**
     * @classdesc Object that contains a handle to the underlying fd, and allows reading and seeking within the file
     * @param {number} fd File descriptor handle used by this FileAsync
     */
    constructor(fd)
    /**
     * Closes the underlying file descriptor.
     * Once this is called, no other methods in this class should be called
     * @returns {Promise<void>}
     */
    close()
    /**
     * Sets the cursor to the specified position within the file
     * @param {number} pos Target offset of the cursor
     */
    seek(pos)
    /**
     * Reads data from the file to the user provided buffer, and advances the cursor according to the number of bytes read
     * @param {Buffer} buf 
     * @returns {Promise<number>} Promise that resolves with the number of bytes read
     */
    read(buf)
    /**
     * Reads data from the file from the cursor up to EOF
     * @returns {Promise<Buffer>} Data read from the file
     */
    readToEnd()
}