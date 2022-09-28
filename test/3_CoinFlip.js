const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoinFlip", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const CoinFlipContract = await ethers.getContractFactory("CoinFlip");
    const AttackContract = await ethers.getContractFactory("AttackCoinFlip");
    const CoinFlip = await CoinFlipContract.deploy();
    await CoinFlip.deployed();
    const Attack = await AttackContract.deploy(CoinFlip.address);
    await Attack.deployed();

    return { CoinFlip, owner, Attack, otherAccount };
  }

  describe("Deployment", function () {
    it("Should Guess 10 Consecutive Guesses", async function () {
      const { CoinFlip, owner, otherAccount, Attack } = await loadFixture(
        deployOneYearLockFixture
      );
      const count = 25;
      for (let i = 0; i < count; i++) {
        await Attack.Attack();
      }
      const consecutiveWins = await CoinFlip.consecutiveWins();
      console.log(consecutiveWins);
      expect(consecutiveWins).to.equal(count);
    });
  });
});
