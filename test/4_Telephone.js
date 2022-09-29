const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Telephone", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const TelephoneContract = await ethers.getContractFactory("Telephone");
    const AttackContract = await ethers.getContractFactory("AttackTelephone");
    const Telephone = await TelephoneContract.deploy();
    await Telephone.deployed();
    const Attack = await AttackContract.deploy(Telephone.address);
    await Attack.deployed();

    return { Telephone, owner, Attack, otherAccount };
  }

  describe("Deployment", function () {
    it("Should Become the Owner of the Telephone Contract", async function () {
      const { Telephone, owner, otherAccount, Attack } = await loadFixture(
        deployOneYearLockFixture
      );
      const Owner = await Telephone.owner();
      expect(Owner).to.equal(owner.address);
      await Attack.connect(otherAccount).Attack();
      const NewOwner = await Telephone.owner();
      expect(NewOwner).to.equal(otherAccount.address);
      console.log(Owner, NewOwner);
    });
  });
});
