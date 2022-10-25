const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Shop", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ShopContract = await ethers.getContractFactory("Shop");
    const Shop = await ShopContract.deploy();
    await Shop.deployed();
    const AttackBuyerContract = await ethers.getContractFactory("AttackBuyer");
    const AttackBuyer = await AttackBuyerContract.deploy(Shop.address);
    await AttackBuyer.deployed();

    return {
      owner,
      otherAccount,
      Shop,
      AttackBuyer,
    };
  }

  describe("Deployment", function () {
    it("Should bought with lower price ", async function () {
      const { owner, otherAccount, Shop, AttackBuyer } = await loadFixture(
        deployOneYearLockFixture
      );

      const initialPrice = await Shop.price();
      const tx = await AttackBuyer.buy();
      await tx.wait(1);
      const finalPrice = await Shop.price();
      expect(initialPrice).to.equal(100);
      expect(finalPrice).to.equal(0);
    });
  });
});
