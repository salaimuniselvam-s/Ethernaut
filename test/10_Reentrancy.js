const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrance", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ReentranceContract = await ethers.getContractFactory("Reentrance");
    const Reentrance = await ReentranceContract.deploy();
    await Reentrance.deployed();
    const AttackReentranceContract = await ethers.getContractFactory(
      "AttackReentrance"
    );
    const AttackReentrance = await AttackReentranceContract.deploy(
      Reentrance.address
    );
    await AttackReentrance.deployed();

    return {
      owner,
      otherAccount,
      Reentrance,
      AttackReentrance,
    };
  }

  describe("Deployment", function () {
    it("Should Drain the Reentrance Contract", async function () {
      const { owner, otherAccount, Reentrance, AttackReentrance } =
        await loadFixture(deployOneYearLockFixture);
      const donate = Reentrance.donate(owner.address, {
        value: ethers.utils.parseEther("1"),
      });
      const ownerBalance = await Reentrance.balanceOf(owner.address);
      const ReentranceOldBalance = await ethers.provider.getBalance(
        Reentrance.address
      );
      await AttackReentrance.Attack({ value: ethers.utils.parseEther("0.2") });
      const ReentranceUpdatedBalance = await ethers.provider.getBalance(
        Reentrance.address
      );

      console.log("owner Balance -->", ethers.utils.formatEther(ownerBalance));
      console.log(
        "ReentranceOldBalance -->",
        ethers.utils.formatEther(ReentranceOldBalance)
      );
      console.log(
        "ReentranceUpdatedBalance -->",
        ethers.utils.formatEther(ReentranceUpdatedBalance)
      );
    });
  });
});
