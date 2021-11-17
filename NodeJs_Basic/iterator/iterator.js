const fs = require("fs");
const fsPromises = fs.promises;
const ft_path = require('path');

class DirectoryBrowser
{
    /**
     * @classdesc Object that will browse a directory and retrieve stats for each item by using an iterator
     * @implements {Iterable<fs.Stats>}
     * @implements {AsyncIterable<fs.Stats>}
     * @param {string} path Path that will be browsed
     */

    constructor(path)
	{
		this.path = path;
		this.path_data = fs.readdirSync(path);
	}
	
    /** * Returns an iterator over the files found in the directory * @returns {Iterator<fs.Stats, fs.Stats, fs.Stats>} */
    fileStats()
	{
		let current = 0;
		const last = (this.path_data.length - 1);
		const data = this.path_data;
		const path = this.path;

		return {
			next(){
				while (current <= last)
				{
					let value_return;
					let absolute_file = ft_path.join(ft_path.normalize(path), data[current]);
					let file_stats = fs.statSync(absolute_file);

					if (file_stats.isDirectory() === true) {
						current++;
					}
					else {
						console.log(data[current]);
						value_return = file_stats;
						current++;
						return { done: false, value: value_return };
					}
				}
				if (current > last) {
					return { done: true };
				}
			},
			[Symbol.iterator](){
				return this
			}
		}
	}

    /** * Returns an iterator over the child directories found in the directory * @returns {Iterator<fs.Stats, fs.Stats, fs.Stats>} */
    dirStats()
	{
		let current = 0;
		const last = (this.path_data.length - 1);
		const data =  this.path_data;
		const path = this.path;

		return {
			next()
			{
				while (current <= last)
				{
					let value_return;
					let absolute_dir = ft_path.join(ft_path.normalize(path), data[current]);
					let dir_stats = fs.statSync(absolute_dir);

					if (dir_stats.isDirectory() === true) {
						console.log(data[current]);
						value_return = dir_stats;
						current++;
						return { done: false, value: value_return };
					}
					else {
						current++;
					}
				}
				if (current > last)
					return { done: true };
			},
			[Symbol.iterator](){
				return this
			}
		}
	}

    /** * Returns an iterator over all the entries in the directory * @returns {Iterator<fs.Stats, fs.Stats, fs.Stats>} */
    entries()
	{
		let		current = 0;
		const	last = (this.path_data.length - 1);
		const	data = this.path_data;
		const path = this.path;

		return {
			next()
			{
				while (current <= last)
				{
					console.log(data[current]);
					let absolute_data = ft_path.join(ft_path.normalize(path), data[current]);
					let value_return = fs.statSync(absolute_data);
					current++;
					return { done: false, value: value_return };	
				}
				if (current > last) {
					return { done: true };
				}
			},
			[Symbol.iterator]() {
				return this
			}
		}
	}

    /** * Returns an async iterator over the files found in the directory * @returns {AsyncIterator<fs.Stats, fs.Stats, fs.Stats>} */
    fileStatsAsync()
	{
		let		current = 0;
		const	last = (this.path_data.length - 1);
		const	data = this.path_data;
		const	path = this.path;

		return {
			async next()
			{
				while (current <= last)
				{
					let value_return;
					let absolute_file = ft_path.join(ft_path.normalize(path), data[current]);
					value_return = await fsPromises.stat(absolute_file);
					if (value_return.isFile()) {
						console.log(data[current]);
						current++;
						return { done: false, value: value_return }
					}
					else {
						current++;
					}
				}
				if (current > last) {
					return { done: true }
				}
			},
			[Symbol.asyncIterator]() {
				return this
			}
		}
	}

    /** * Returns an async iterator over the child directories found in the directory * @returns {AsyncIterator<fs.Stats, fs.Stats, fs.Stats>} */
    dirStatsAsync()
	{
		let		current = 0;
		const	last = (this.path_data.length - 1);
		const	data = this.path_data;
		const	path = this.path;

		return {
			async next()
			{
				while (current <= last)
				{
					let value_return;
					let absolute_dir = ft_path.join(ft_path.normalize(path), data[current]);
					value_return = await fsPromises.stat(absolute_dir);
					if (value_return.isDirectory()) {
						console.log(data[current]);
						current++;
						return { done: false, value: value_return }
					}
					else {
						current++;
					}
				}
				if (current > last) {
					return { done: true }
				}
			},
			[Symbol.asyncIterator]() {
				return this
			}
		}
	}

    /** * Returns an async iterator over all the entries in the directory * @returns {AsyncIterator<fs.Stats, fs.Stats, fs.Stats>} */
    entriesStatsAsync()
	{
		let		current = 0;
		const	last = (this.path_data.length - 1);
		const	data = this.path_data;
		const	path = this.path;

		return {
			async next()
			{
				while (current <= last)
				{
					let value_return;
					let absolute_data = ft_path.join(ft_path.normalize(path), data[current]);
					console.log(data[current]);
					value_return = await fsPromises.stat(absolute_data);
					current++;
					return { done: false, value: value_return }
				}
				if (current > last) {
					return { done: true }
				}
			},
			[Symbol.asyncIterator]() {
				return this
			}
		}
	}
}

// Class instances

const directory_manager_process = new DirectoryBrowser('C:\\Users\\alexander.bello\\Desktop\\pe\\iterator');

ft_test(directory_manager_process);

async function ft_test(directory)
{
	/*********** FILE STATS ITER *************/
	// let file_stats_iter = directory.fileStats();

	// for (let stat of file_stats_iter)
	// 	console.log(stat);
	/******************************************/


	/*************** DIR STATS ****************/
	let dir_stats_iter = directory.dirStats();

	for (let stat of dir_stats_iter)
		console.log(stat);
	/******************************************/


	/*************** ALL STATS ****************/
	// let all_stats_iter = directory.entries();
	// 	for (let stat of all_stats_iter)
	// 		console.log(stat);
	/******************************************/


	/********* FILE STATS ASYNC *****************/
	// let file_stats_async = directory.fileStatsAsync();
	// for await (let stat of file_stats_async)
	// 	console.log(stat);
	/********************************************/


	/******** DIR STATS ASYNC *******************/
	// let dir_stats_async = directory.dirStatsAsync();
	// for await (let stat of dir_stats_async)
	// 	console.log(stat);
	/********************************************/


	/******** ALL STATS ASYNC *******************/
	// let all_stats_async = directory.entriesStatsAsync();
	// for await (let stat of all_stats_async)
	// 	console.log(stat);
	/********************************************/

}
