const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Denial", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DenialContract = await ethers.getContractFactory("Denial");
    const Denial = await DenialContract.deploy();
    await Denial.deployed();
    const AttackDenialContract = await ethers.getContractFactory(
      "AttackDenial"
    );
    const AttackDenial = await AttackDenialContract.deploy();
    await AttackDenial.deployed();
    return {
      owner,
      otherAccount,
      Denial,
      AttackDenial,
    };
  }

  describe("Deployment", function () {
    it("Should stop the owner from withdrawing in Denial Contract", async function () {
      const { owner, otherAccount, Denial, AttackDenial } = await loadFixture(
        deployOneYearLockFixture
      );
      const tx = await owner.sendTransaction({
        to: Denial.address,
        value: ethers.utils.parseEther("7"),
      });
      await tx.wait(1);
      const contractBalance = await Denial.contractBalance();
      console.log(ethers.utils.formatEther(await owner.getBalance()));
      console.log(ethers.utils.formatEther(contractBalance));
      await Denial.setWithdrawPartner(AttackDenial.address);
      await Denial.withdraw();
    });
  });
});
