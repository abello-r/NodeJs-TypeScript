
/*------------------------------------ Basic Buffer -----------------------------------------*/ console.log('\nBasic Buffer\n');

const   buf_one = Buffer.alloc(10); // Len 10 filled by zero.
console.log(buf_one);

const   buf_two = Buffer.alloc(15, 9); // Len 15 filled by 9
console.log(buf_two);

const   buf_unsafe = Buffer.allocUnsafe(10); // More faster than (alloc) but but it might have old junk data
console.log(buf_unsafe);

const   buf_draw = Buffer.allocUnsafe(10).fill(2); // Can fill the buff with this method [Fill]
console.log(buf_draw);

const   buf_one_by_one = Buffer.from([1, 2, 3]); // Fill byte x byte
console.log(buf_one_by_one);

const buf_exceeded = Buffer.from([257, 257.5, -255, 2]); // Max value [0-255] if it's exceeded, it will be filled with 1
console.log(buf_exceeded);

const   buf_text = Buffer.from('Forty-Two'); // Save the utf-8 value in decimal notation
console.log(buf_text);

const   test = "Hello";
const   buf_variable = Buffer.from(test); // We can store a buff for a variable
console.log(buf_variable);

/*------------------------------------- Encode buffer -----------------------------------------*/ console.log('\nEncode_Buffer\n');

const buf_default = Buffer.from('Default_encode', 'utf-8');
console.log(buf_default); // Decimal
console.log(buf_default.toString('hex'));
console.log(buf_default.toString('base64'));
console.log(buf_default.toString('base64url'));

/*------------------------------------- buffer Iteration -----------------------------------------*/ console.log('\nBuffer_Iteration\n');

const buf = Buffer.from([1, 2, 3]);

for (let i = 0; buf[i]; i++)
    console.log(buf[i]);


