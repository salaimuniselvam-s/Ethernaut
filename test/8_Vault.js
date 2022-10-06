const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Password = "sms";
    const VaultContract = await ethers.getContractFactory("Vault");
    const Vault = await VaultContract.deploy(
      ethers.utils.formatBytes32String(Password)
    );
    await Vault.deployed();

    return {
      owner,
      otherAccount,
      Vault,
      Password,
    };
  }

  describe("Deployment", function () {
    it("Should Know the value of the private state variable", async function () {
      const { owner, otherAccount, Vault, Password } = await loadFixture(
        deployOneYearLockFixture
      );
      const password = await ethers.provider.getStorageAt(Vault.address, 1);
      expect(ethers.utils.parseBytes32String(password)).to.equal(Password);
    });
  });
});
