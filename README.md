# OrangeHRM
## Installation
**Make sure you have Nodejs and typescript on your device**
Download nodejs:
https://nodejs.org/en/download/package-manager

after you clone the project:
```bash
npm install
npm init playwright@latest
```

# How to run
Go to run.sh file and change the content in ''
```sh
node runCli.js --options ''
```
### Run the tests by testID
```sh
-g "<testID>|<testID>|<testID>"
```
example:
```sh
node runCli.js --options '-g "@TC1|@TC2|@TC3"'
```
Note: you can also run test suite ID instead
### Run the tests with the titles
```sh
-g "<title>|<title>"
```
example:
```sh
node runCli.js --options '-g "login failed when inputing only user name|login failed when inputing only password"'
```

### Run the tests with headless mode
My default mode is headed. If you want to run the test in headless mode, there is it 
```sh
node runCli.js --headless <options>
```
example:
```sh
node runCli.js --headless '-g "login failed when inputing only user name|login failed when inputing only password"`
```
### Give the failing test <number> retry attemps
only the failing tests will get retry
```sh
--retries=<number>
```
example:
```sh
node runCli.js --options '-g "@TC1|@TC2|@TC3" --retries=2'
```

