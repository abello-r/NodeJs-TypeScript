const	file_manager = require('./file_manager_async.js');
const	fs = require('fs');
const	fsPromises = require('fs').promises;


class	BmpFile
{
	static async Init(file)
	{
		let	head_line = Buffer.allocUnsafe(0x36);
		let	read_bytes = await file.read(head_line);

		if (read_bytes === 0 || read_bytes < 0) {
			throw new Error('[ File can\'t be readed ]');
		}
		else if (head_line[0] != 66 || head_line[1] != 77) {
			throw new Error('[ No BMP file ]');
		}

		return new BmpFile(file, head_line);
	}
	
	constructor(file, head_line)
	{
		this.file = file;
		this.head_line = head_line;
	}

	info()
	{
		let file_size = this.head_line.readInt32LE(2);
		//console.log(`Size\t\t[KiloBytes ${file_size}]`);

		let	start_of_image_data = this.head_line.readInt32LE(10);
		//console.log(`Start img data\t\t [${start_of_image_data}]`);

		let	file_width = this.head_line.readInt32LE(18);
		//console.log(`Width\t\t[Pixels ${file_width}]`);

		let	file_height = this.head_line.readInt32LE(22);
		//console.log(`Height\t\t[Pixels ${file_height}]`);

		let	file_bit_depth = (this.head_line.readInt8(28) + this.head_line.readInt8(29));
		//console.log(`BitDepth\t[Bits/Pixel ${file_bit_depth}]`);
	
		let	file_head_size = this.head_line.readInt32LE(14);
		//console.log(`HeadSize\t[Bytes ${file_head_size}]`);
	
		let	file_horizontal_resolution = Math.round(this.head_line.readInt32LE(38) * 0.0254);
		let	file_vertical_resolution = Math.round(this.head_line.readInt32LE(42) * 0.0254);
		//console.log(`DPI\t\t[${file_horizontal_resolution} x ${file_vertical_resolution}]`);
	
		let obj_info = {
			size: file_size,
			width: file_width,
			height: file_height,
			bitDepth: file_bit_depth,
			headSize: file_head_size,
			startOfimg: start_of_image_data,
			dpi: {H: file_horizontal_resolution, V: file_vertical_resolution}
		};

		return obj_info;
	}

	line_horizontal()
	{
		const	obj_info = this.info();
		const	file = this.file;
		const	line_length = obj_info.width * 3;
		file.seek(this.head_line.length);

		return {
			async next () {
				while (1)
				{
					let	line = Buffer.allocUnsafe(line_length);
					let r_b = await file.read(line);
					if (r_b === 0) {
						return { done: true }
					}
					else {
						return { done: false, value: line }
					}
				}
			},
			[Symbol.asyncIterator](){
				return this
			}
		}
	}

	async rotate()
	{
		const	obj_info = this.info();
		let file_handle = await fsPromises.open('./rotate.bmp', 'w');
		let ofs = (await file_handle.write(this.head_line)).bytesWritten;
		ofs += ((obj_info.height - 1) * (obj_info.width * 3));

		for await (let data of this.line_horizontal())
		{
			await file_handle.write(data, 0, data.length, ofs);
			ofs -= obj_info.width * 3;
		}
		await file_handle.close();
	}
}

async function ft_process(file_manager)
{
	const	file = await file_manager.class.CreateFileAsync('./N3_Icon.bmp');
	const	file_class = await BmpFile.Init(file);

	let obj_info = file_class.info();
	let horizontal_line = file_class.line_horizontal();

	// for await (let pos of horizontal_line) {
	// 	console.log(pos);
	// }

	await file_class.rotate();
	await file.close();
}

ft_process(file_manager);
