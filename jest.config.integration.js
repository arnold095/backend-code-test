// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./jest.config");
config.collectCoverage = false;
config.testPathIgnorePatterns = ["Application/.*.ts"];
console.info("RUNNING INTEGRATION TESTS");
module.exports = config;
