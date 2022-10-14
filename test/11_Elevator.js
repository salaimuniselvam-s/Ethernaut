const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Elevator", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ElevatorContract = await ethers.getContractFactory("Elevator");
    const Elevator = await ElevatorContract.deploy();
    await Elevator.deployed();
    const BuildingContract = await ethers.getContractFactory("Building");
    const Building = await BuildingContract.deploy(Elevator.address);
    await Building.deployed();

    return {
      owner,
      otherAccount,
      Elevator,
      Building,
    };
  }

  describe("Deployment", function () {
    it("Should Go to the Top of the elevator", async function () {
      const { owner, otherAccount, Elevator, Building } = await loadFixture(
        deployOneYearLockFixture
      );
      const Top = await Elevator.top();
      expect(Top).to.equal(false);
      await Building.attack();
      const top = await Elevator.top();
      expect(top).to.equal(true);
    });
  });
});
