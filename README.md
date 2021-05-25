# Lab8_Starter

## Name : Enzo Han

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

Manually run them locally before pushing code

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, because a "messaging" feature would involve multiple parts of code so using a unit test wouldn't be able to cover every part. For this I would use E2E testing.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes because "max message length" is merely one part of the entire messaging feature. A unit test would easily cover testing if the "max message length" works or not.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

I would expect that when I run my tests my chrome browser would not open since "headless" means the test runs without a UI browser.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

The line "await page.goto('http://127.0.0.1:5500');" would be replace with "await page.goto('http://127.0.0.1:5500/#settings');".