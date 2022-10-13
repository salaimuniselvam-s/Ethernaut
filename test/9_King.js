const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("King", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const KingContract = await ethers.getContractFactory("King");
    const King = await KingContract.deploy({
      value: ethers.utils.parseEther("0.1"),
    });
    await King.deployed();
    const AttackKingContract = await ethers.getContractFactory("AttackKing");
    const AttackKing = await AttackKingContract.deploy(King.address);
    await AttackKing.deployed();

    return {
      owner,
      otherAccount,
      King,
      AttackKing,
    };
  }

  describe("Deployment", function () {
    it("Should Become the King", async function () {
      const { owner, otherAccount, King, AttackKing } = await loadFixture(
        deployOneYearLockFixture
      );
      await AttackKing.attack({
        value: ethers.utils.parseEther("0.2"),
      });
      await expect(
        owner.sendTransaction({
          to: King.address,
          value: ethers.utils.parseEther("0.5"),
          gasLimit: 2000000,
        })
      ).to.be.revertedWith(`You can't claim my throne!`);
      const king = await King._king();
      expect(king).to.equal(AttackKing.address);
      console.log(king, AttackKing.address);
    });
  });
});
