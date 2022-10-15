const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GateKeeperTwo", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const GateKeeperTwoContract = await ethers.getContractFactory(
      "GatekeeperTwo"
    );
    const GateKeeperTwo = await GateKeeperTwoContract.deploy();
    await GateKeeperTwo.deployed();

    const AttackGateKeeperTwoContract = await ethers.getContractFactory(
      "AttackGateKeeperTwo"
    );
    const AttackGateKeeperTwo = await AttackGateKeeperTwoContract.deploy(
      GateKeeperTwo.address
    );
    await AttackGateKeeperTwo.deployed();

    return {
      owner,
      otherAccount,
      GateKeeperTwo,
      AttackGateKeeperTwo,
    };
  }

  describe("Deployment", function () {
    it("Should enter into the  GateKeeperTwo Contract", async function () {
      const { owner, otherAccount, GateKeeperTwo, AttackGateKeeperTwo } =
        await loadFixture(deployOneYearLockFixture);
      const entered = await GateKeeperTwo.entrant();
      console.log(entered);
      expect(entered).to.equal(owner.address);
    });
  });
});
