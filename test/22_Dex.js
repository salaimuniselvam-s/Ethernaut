const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dex", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DexContract = await ethers.getContractFactory("Dex");
    const Dex = await DexContract.deploy();
    await Dex.deployed();
    const Token1Contract = await ethers.getContractFactory("SwappableToken");
    const InitialAmount = ethers.utils.parseEther("20");
    const Token1 = await Token1Contract.deploy(
      Dex.address,
      "SMS",
      "sms",
      InitialAmount
    );
    await Token1.deployed();
    const Token2Contract = await ethers.getContractFactory("SwappableToken");
    const Token2 = await Token2Contract.deploy(
      Dex.address,
      "SG",
      "sg",
      InitialAmount
    );
    await Token2.deployed();

    return {
      owner,
      otherAccount,
      Dex,
      Token1,
      Token2,
      InitialAmount,
    };
  }

  describe("Deployment", function () {
    it("Should Manipulate the Dex", async function () {
      const { owner, otherAccount, Dex, Token1, Token2, InitialAmount } =
        await loadFixture(deployOneYearLockFixture);
      await Dex.setTokens(Token1.address, Token2.address);
      //Here we are setting the initial Supply , so we can easily drain one token
      // if we set with 1:1 ratio, then we have to swap respectively until one of the token becomes zero
      const token1 = await Dex.token1();
      const token2 = await Dex.token2();
      expect(token1).to.equal(Token1.address);
      expect(token2).to.equal(Token2.address);
      const token1Balance = await Dex.balanceOf(token1, owner.address);
      const token2Balance = await Dex.balanceOf(token2, owner.address);
      expect(token1Balance).to.equal(InitialAmount);
      expect(token2Balance).to.equal(InitialAmount);
      await Dex.approve(Dex.address, InitialAmount);
      await Dex.addLiquidity(token1, ethers.utils.parseEther("5"));
      await Dex.addLiquidity(token2, ethers.utils.parseEther("1"));
      const balance = await Dex.balanceOf(token1, Dex.address);
      console.log(ethers.utils.formatEther(balance));
      const getPrice = await Dex.getSwapPrice(
        token1,
        token2,
        ethers.utils.parseEther("5")
      );
      console.log(ethers.utils.formatEther(getPrice), "getPrice");
      await Dex.swap(token1, token2, ethers.utils.parseEther("5"));
      const balance1 = await Dex.balanceOf(token1, Dex.address);
      const balance2 = await Dex.balanceOf(token2, Dex.address);
      console.log(
        ethers.utils.formatEther(balance1),
        ethers.utils.formatEther(balance2)
      );
      const getSwapPrice = await Dex.getSwapPrice(
        token1,
        token2,
        ethers.utils.parseEther("7")
      );
      console.log(getSwapPrice);
      await Dex.swap(token1, token2, ethers.utils.parseEther("7"));
      const updatedToken1 = await Dex.balanceOf(token1, Dex.address);
      console.log(ethers.utils.formatEther(updatedToken1));
    });
  });
});
