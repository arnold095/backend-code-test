// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: "./.env" });
const common = [
  "--require-module ts-node/register",
  "--require-module tsconfig-paths/register",
];
console.info("RUNNING ACCEPTANCE TESTS");
const genially = [
  ...common,
  "**/tests/api/**/*.feature",
  "--require **/tests/api/**/*.steps.ts",
].join(" ");

module.exports = {
  genially,
};
