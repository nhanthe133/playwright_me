const dotenv = require("dotenv")
dotenv.config({path: '.env'});

const fs = require("fs")
const args = process.argv


console.log(process.argv)

var runCommand = `
npx playwright test \
__RUNOPS__ \
--headed \
--project=chromium
`
//my custom
var running = `npx playwright test`

switch(args[2]) {
    case 'addSuite':
    TESTCASE=process.env.ADDSUITE
      break
    case 'deleteSuite':
    TESTCASE=process.env.DELETESUITE
      break
    case 'detailSuite':
    TESTCASE=process.env.DETAILSUITE
      break
    case 'editSuite':
      TESTCASE=process.env.EDITSUITE
      break
    case 'searchSuite':
      TESTCASE=process.env.SEARCHSUITE
      break
    default:
    TESTCASE=process.env.TESTCASE
  }
// TESTCASE=process.env.TESTCASE


SPLITED = TESTCASE.split(",");

for (var i = 0; i < SPLITED.length; i++){
    SPLITED[i] = SPLITED[i].trim()
}

runOpts = `-g "${SPLITED.join("|")}"`

runCommand = runCommand.replace("__RUNOPS__", runOpts)
fs.writeFileSync("run_cmd.sh", runCommand)
