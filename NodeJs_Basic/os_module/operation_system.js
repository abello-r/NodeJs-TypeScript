/*------------ Operation System [Module] -------------*/
const   os = require('os');

console.log('\nUser = ' + os.userInfo().username);
console.log('Hostname = ' + os.hostname());
console.log('Platform = ' + os.platform());
console.log('Version = ' + os.version());
console.log('Uptime = ' + os.uptime() + ' seconds\n');
