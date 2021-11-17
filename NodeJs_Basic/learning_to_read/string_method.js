const   path = require('path');
const   fs = require('fs');
const   PATH_FILE =  path.join(__dirname, "book.txt");

fs.readFile(PATH_FILE, 'utf-8', (err, data) =>
{
    if (err)
        throw err;
    else
    {
        let str = data.split('\n'); // Parse data to string
        let i = 0;

        for (i; str[i] || str[i] == ''; i++)
        {
            if (str[i] == '')
            {
                for(i; str[i] == ''; i++);
            }
            if (str[i] === undefined)
                break ;
            console.log('Line  [' + [i+1] + '] ' + str[i]); // Print one by one
        }
        console.log('\nTotal Lines = [' + i + ']');
    }
});
