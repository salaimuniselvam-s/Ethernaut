const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NaughtCoin", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const NaughtCoinContract = await ethers.getContractFactory("NaughtCoin");
    const NaughtCoin = await NaughtCoinContract.deploy(owner.address);
    await NaughtCoin.deployed();

    return {
      owner,
      otherAccount,
      NaughtCoin,
    };
  }

  describe("Deployment", function () {
    it("Should empty the  NaughtCoin Contract", async function () {
      const { owner, otherAccount, NaughtCoin } = await loadFixture(
        deployOneYearLockFixture
      );
      const player = await NaughtCoin.player();
      const InitialSupply = await NaughtCoin.INITIAL_SUPPLY();
      console.log(player, ethers.utils.formatEther(InitialSupply));
      const ownerInitialBalance = await NaughtCoin.balanceOf(owner.address);
      // Approve & Transfer From ERC20
      await NaughtCoin.approve(otherAccount.address, InitialSupply);
      await NaughtCoin.connect(otherAccount).transferFrom(
        player,
        otherAccount.address,
        InitialSupply
      );
      const ownerFinalBalance = await NaughtCoin.balanceOf(owner.address);
      expect(ethers.utils.formatEther(ownerInitialBalance)).to.equal(
        "1000000.0"
      );
      expect(ethers.utils.formatEther(ownerFinalBalance)).to.equal("0.0");
    });
  });
});
