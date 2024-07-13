require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    artifacts: "src/backend/artifacts",
    cache: "src/backend/cache",
    ignition: "src/backend/ignition",
    tests: "src/backend/tests",
    sources: "src/backend/contracts",
  },
};
