const playwright = require('playwright');
const chalk = require('chalk');

// Variables 
const username = 'username_here';
const password = 'password_here';
const url = 'https://profile.intra.42.fr/';

async function ft_capture()
{
	const browserType = playwright.chromium // Use chrome browser
	
	const browser = await browserType.launch( { headless: false, slowMo: 350 } ); // Launch the browser
	const context = await browser.newContext(); // Create a new incog window
	const page = await context.newPage();
  
	await page.goto(url); // Go to the url
	await console.log(chalk.green('Website load [OK]'));

	await page.fill('#user_login', username); // Fill [Username]
	await console.log(chalk.green('Fill username input [OK]'));

	await page.fill('#user_password', password); // Fill [Password]
	await console.log(chalk.green('Fill password input [OK]'));

	await page.click('#new_user > div.form-actions > input'); // Click on submit
	await page.waitForLoadState();

	if (await page.isVisible('body > div.notifications-flash-top-bar') == true) // Invalid password?
		console.log(chalk.red('Invalid Password [KO]'));
	else
		console.log(chalk.green('Successful login [OK]'));

    await page.screenshot( { path: "checker.png" } );
    await browser.close();

};

ft_capture();