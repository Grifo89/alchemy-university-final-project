const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const tokenContractFactory = await ethers.getContractFactory("SimpleToken");
  const token = await tokenContractFactory.deploy();
  console.log("Simple DeFi Token Contract Address: ", await token.getAddress());
  console.log("Deployer: ", deployer.address);
  console.log(
    "Deployer ETH balance: ",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  saveContractToFrontend(token, "SimpleToken");
}

async function saveContractToFrontend(contract, name) {
  const contractsDir = __dirname + "/../src/frontend/contracts";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: await contract.getAddress() }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
