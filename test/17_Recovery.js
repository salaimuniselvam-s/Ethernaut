const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Recovery", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const RecoveryContract = await ethers.getContractFactory("Recovery");
    const Recovery = await RecoveryContract.deploy();
    const nonce = await ethers.provider.getTransactionCount(Recovery.address);
    await Recovery.deployed();
    const Name = "Sms";
    await Recovery.generateToken(Name, 100000);
    console.log(ethers.utils.hexlify(nonce));
    const rlpEncoded = ethers.utils.RLP.encode([
      Recovery.address,
      ethers.utils.hexlify(nonce),
    ]);
    const contractAddress = ethers.utils.keccak256(rlpEncoded);
    const DeployedContractAddress = `0x${contractAddress.substring(
      contractAddress.length - 40
    )}`;
    const SimpleToken = await ethers.getContractAt(
      "SimpleToken",
      DeployedContractAddress,
      owner
    );

    return {
      owner,
      otherAccount,
      SimpleToken,
      Name,
    };
  }

  describe("Deployment", function () {
    it("Should Recover the ether from the Contract", async function () {
      const { owner, otherAccount, Name, SimpleToken } = await loadFixture(
        deployOneYearLockFixture
      );
      const tokenName = await SimpleToken.name();
      await SimpleToken.destroy(owner.address);
      expect(tokenName).to.equal(Name);
    });
  });
});
