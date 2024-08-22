// const dotenv = require("dotenv")
// dotenv.config({path: '.env'});

const fs = require("fs");
const args = process.argv;

// console.log(process.argv)

var runCommand = `
npx playwright test \
__RUNOPS__ \
--headed \
--project=chromium
`;
//my custom
var running = `npx playwright test`;

switch (args[2].toLowerCase()) {
  case "--testcase":
    TESTCASE = args[3];
    break;
  case "--options":
    runOpts = args[3];
    break;
  
  
}
// TESTCASE=process.env.TESTCASE

// SPLITED = TESTCASE.split(",");

// for (var i = 0; i < SPLITED.length; i++) {
//   SPLITED[i] = SPLITED[i].trim();
// }

// runOpts = `-g "${SPLITED.join("|")}"`;

runCommand = runCommand.replace("__RUNOPS__", runOpts);
fs.writeFileSync("run_cmd.sh", runCommand);
