
/* login.test.js */

import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts'
import { assertEquals, assertNotEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts'

const url = 'https://finlandbridge-pulseaudio-8080.codio-box.uk'

// FEATURE user can log in
// checks that the login screen can be accessed and that only valid
// usernames and password allow access to the Foo Bar screen

// SCENARIO access login page from home page
Deno.test('access login page from home page     ', async test => {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// WHEN I click on the login button
			await page.click('a[href="/login"]', { waitUntil: 'networkidle0' })
	// THEN I should see the page heading "Log In"
			const heading = await page.$eval('h1', node => node.innerText)
			await assertEquals(heading, 'Log In', 'log in screen not found')
	// AND the "username" input field should be visible
			const usernameField = await page.$eval('input[name="username"]', node => node.offsetParent)
			await assertNotEquals(usernameField, null, 'username field is not visible')
			await browser.close()
})

// SCENARIO log in with valid username/password
Deno.test('log in with valid username/password  ', async test => {
	// GIVEN I am on the homepage
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
	// AND I click on the login button
			await page.click('a[href="/login"]', { waitUntil: 'networkidle0' })
	// WHEN I enter "doej" in the username field
			await page.type('input[name="username"]', 'doej')
	// AND I enter "p455w0rd" in the password field
			await page.type('input[name="password"]', 'p455w0rd')
	// AND I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
	// THEN I should see the "Foo Bar" page
			const heading = await page.$eval('h1', node => node.innerText)
			await assertEquals(heading, 'Foo Bar', 'logging in does not take user to Foo Bar page')
			await browser.close()
})

// SCENARIO log in with invalid password
Deno.test('log in with invalid password         ', async test => {
	// GIVEN I am on the "Log In" page
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
			await page.click('a[href="/login"]', { waitUntil: 'networkidle0' })
	// WHEN I enter "doej" in the username field
			await page.type('input[name="username"]', 'doej')
	// AND I enter "fakepassword" in the password field
			await page.type('input[name="password"]', 'fakepassword')
	// AND I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
	// THEN I should be returned to the "Log In" page
			const heading = await page.$eval('h1', node => node.innerText)
			await assertEquals(heading, 'Log In', 'invalid password does not send user back to login page')
			await browser.close()
})

// SCENARIO log in with invalid username/password
Deno.test('log in with invalid username/password', async test => {
	// GIVEN I am on the "Log In" page
			const browser = await puppeteer.launch({ headless: true })
			const page = await browser.newPage()
			await page.goto(url, { waitUntil: 'networkidle0' })
			await page.click('a[href="/login"]', { waitUntil: 'networkidle0' })
	// WHEN I enter "fakeuser" in the username field
			await page.type('input[name="username"]', 'fakeuser')
	// AND I enter "fakepassword" in the password field
			await page.type('input[name="password"]', 'fakepassword')
	// AND I click on the login button
			await page.click('input[type="submit"]', { waitUntil: 'networkidle0' })
	// THEN I should be returned to the "Log In" page
			const heading = await page.$eval('h1', node => node.innerText)
			await assertEquals(heading, 'Log In', 'invalid credentials dont send user back to login page')
			await browser.close()
})
