## Installation
**Make sure you have Nodejs and typescript on your device**
Download nodejs:
https://nodejs.org/en/download/package-manager

after you clone the project:
```sh
npm install
npm init playwright@latest
```

# How to run
## Login page
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

## Recruitment Page

### Run entire search candidate page
```sh
npm run allsearchcandidate
```
### Run a test or multiple tests in search candidate page with title
```sh
npm run searchcandidate "<title>"
npm run searchcandidate "<title>|<title>"
```
example:
```sh
npm run searchcandidate "Filter candidates by Vacancy|Filter candidates by Status"
```
### Run entire add candidate page
```sh
npm run alladdcandidate
```
### Run a test or multiple tests in search candidate page with title
```sh
npm run addcandidate "<title>"
npm run addcandidate "<title>|<title>"
```
example:
```sh
npm run addcandidate "File size validation alert should be shown when upload file with size larger than 1MB|File type not allowed validation alert should be shown when uploading invalid file type"
```
