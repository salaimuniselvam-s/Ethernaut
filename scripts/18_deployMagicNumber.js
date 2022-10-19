const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0x073A7ef3a6346Ca11399b74b3aB3e6b354b0FA4D";
  const MagicNumberContract = await ethers.getContractFactory("MagicNumber");
  const MagicNumber = MagicNumberContract.attach(Instance);

  const AttackMagicNumberContract = await ethers.getContractFactory(
    "AttackMagicNumber"
  );
  const AttackMagicNumber = await AttackMagicNumberContract.deploy(
    MagicNumber.address
  );
  await AttackMagicNumber.deployed();
  const initialAddr = await MagicNumber.solver();
  console.log(initialAddr);
  const tx = await AttackMagicNumber.Attack();
  const receipt = await tx.wait(1);
  let Final;
  for (const event of receipt.events) {
    Final = event.args[0];
    console.log(`Event ${event.event} with args ${event.args}`);
  }
  const finalAddr = await MagicNumber.solver();
  console.log(finalAddr);
  console.log(Final);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
