const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MagicNumber", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const MagicNumberContract = await ethers.getContractFactory("MagicNumber");
    const MagicNumber = await MagicNumberContract.deploy();
    await MagicNumber.deployed();
    const AttackMagicNumberContract = await ethers.getContractFactory(
      "AttackMagicNumber"
    );
    const AttackMagicNumber = await AttackMagicNumberContract.deploy(
      MagicNumber.address
    );
    await AttackMagicNumber.deployed();

    return {
      owner,
      otherAccount,
      MagicNumber,
      AttackMagicNumber,
    };
  }

  describe("Deployment", function () {
    it("Should Create a Contract with only 10 Opcodes", async function () {
      const { owner, otherAccount, MagicNumber, AttackMagicNumber } =
        await loadFixture(deployOneYearLockFixture);
      const initialAddr = await MagicNumber.solver();
      console.log(initialAddr);
      const tx = await AttackMagicNumber.Attack();
      const receipt = await tx.wait(1);
      let Final;
      for (const event of receipt.events) {
        Final = event.args[0];
        console.log(`Event ${event.event} with args ${event.args}`);
      }
      const finalAddr = await MagicNumber.solver();
      console.log(finalAddr);
      expect(initialAddr).to.equal(ethers.constants.AddressZero);
      expect(finalAddr).to.equal(Final);
    });
  });
});
