## Installation
**Make sure you have Nodejs and typescript on your device**
Download nodejs:
https://nodejs.org/en/download/package-manager

after you clone the project:
```sh
npm install
npm init playwright@latest
```

## How to run

### Run all the tests
```sh
npm run runalltest
```

### Run a single test file
```sh
npm run testfile <text file name>
npm run testfile loginTest
```

### Run test that are in line <number> in <text file name>
```sh
npm run runtest <text file name>:<number>
npm run testfile loginTest:14
```
### Run the test with the title
```sh
npm run testtitle "<title>|<title>"
npm run testtitle "login failed when inputing only user name|login failed when inputing only password"
```
### Run the tests with headed browser
```sh
npm run testheaded <text file name as a option>
```
### Run the tests against specific project chromium
```sh
npm run testchromium <text file name as a option>
```
### Run the tests in headed againt specific project chromium 
```sh
npm run testchromium:headed <text file name as a option>
```
### Run the tests against specific project firefox
```sh
npm run testfirefox <text file name as a option>
```
### Run the tests in headed againt specific project firefox 
```sh
npm run testfirefox:headed <text file name as a option>
```
### Run the tests against specific project webkit
```sh
npm run testwebkit <text file name as a option>
```
### Run the tests in headed againt specific project webkit 
```sh
npm run testwebkit:headed <text file name as a option>
```