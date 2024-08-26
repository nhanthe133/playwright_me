// const dotenv = require("dotenv")
// dotenv.config({path: '.env'});

const fs = require("fs");
const args = process.argv;

// console.log(process.argv)

// var runCommand = `
// npx playwright test \
// __RUNOPS__ \
// --headed \
// --project=chromium
// `;

var runCommand = `
npx playwright test \
__RUNOPS__ \
--headed \
--project=chromium
`;

//my custom

switch (args[2].toLowerCase()) {
  case "--options":
    runOpts = args[3];
    break;
  case "--headless":
    runOpts = args[3];
    runCommand = runCommand.replace("--headed", '');
    break;
}
// TESTCASE=process.env.TESTCASE

// SPLITED = TESTCASE.split(",");

// for (var i = 0; i < SPLITED.length; i++) {
//   SPLITED[i] = SPLITED[i].trim();
// }

// runOpts = `-g "${SPLITED.join("|")}"`;

runCommand = runCommand.replace("__RUNOPS__", runOpts);
// runCommand = runCommand.replace("--headed ", mode);
fs.writeFileSync("run_cmd.sh", runCommand);
