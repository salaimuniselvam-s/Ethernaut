const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Elevator", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const PrivacyContract = await ethers.getContractFactory("Privacy");
    const data = [
      ethers.utils.formatBytes32String("s"),
      ethers.utils.formatBytes32String("m"),
      ethers.utils.formatBytes32String("s"),
    ];

    const Privacy = await PrivacyContract.deploy(data);
    await Privacy.deployed();

    const cutBytes32Contract = await ethers.getContractFactory("CutBytes32");
    const cutBytes = await cutBytes32Contract.deploy();
    await cutBytes.deployed();

    return {
      owner,
      otherAccount,
      Privacy,
      cutBytes,
    };
  }

  describe("Deployment", function () {
    it("Should Open the lock of  Privacy Contract", async function () {
      const { owner, otherAccount, Privacy, cutBytes } = await loadFixture(
        deployOneYearLockFixture
      );
      const locked = await Privacy.locked();
      const password = await ethers.provider.getStorageAt(Privacy.address, 5);
      const unlockPassword = await cutBytes.cutBytes32(password);
      await Privacy.unlock(unlockPassword[0]);
      const locked1 = await Privacy.locked();
      console.log(password);
      console.log(locked, locked1);
    });
  });
});
