const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Force", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ForceContract = await ethers.getContractFactory("Force");
    const Force = await ForceContract.deploy();
    await Force.deployed();
    const oldBalance = await ethers.provider.getBalance(Force.address);
    const AttackForceContract = await ethers.getContractFactory("AttackForce");
    const AttackForce = await AttackForceContract.deploy(Force.address, {
      value: ethers.utils.parseEther("1"),
    });
    await AttackForce.deployed();
    const updatedBalance = await ethers.provider.getBalance(Force.address);

    return {
      owner,
      otherAccount,
      oldBalance,
      updatedBalance,
    };
  }

  describe("Deployment", function () {
    it("Should Increase the Balance", async function () {
      const { owner, otherAccount, oldBalance, updatedBalance } =
        await loadFixture(deployOneYearLockFixture);
      console.log(oldBalance, updatedBalance);
      expect(oldBalance).to.equal(ethers.BigNumber.from("0"));
      expect(updatedBalance).to.equal(ethers.utils.parseEther("1"));
    });
  });
});
