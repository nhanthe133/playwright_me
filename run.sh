# node runHelper.js searchSuite
# chmod a+x run_cmd.sh
# ./run_cmd.sh
# node runCli.js --options '-g "@TC1|@TC2|@TCXX"'
# node runCli.js --headless '-g "@AC|@DC"'
node runCli.js --options '-g "Filter candidates by fill all the fields" --retries=3'
chmod a+x run_cmd.sh
./run_cmd.sh
