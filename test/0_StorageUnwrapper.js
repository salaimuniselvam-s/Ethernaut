const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

//Reference
//https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/

describe("StorageUnwrapper", function () {
  async function deployOneYearLockFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const StorageUnwrapperContract = await ethers.getContractFactory(
      "StorageUnwrapper"
    );
    const StorageUnwrapper = await StorageUnwrapperContract.deploy();
    await StorageUnwrapper.deployed();

    return { StorageUnwrapper, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Understand the storage of the solidity", async function () {
      const { StorageUnwrapper, owner, otherAccount } = await loadFixture(
        deployOneYearLockFixture
      );
      //boolean
      const addr = StorageUnwrapper.address;
      await StorageUnwrapper.setBoolean(true);
      const slot0 = await ethers.provider.getStorageAt(addr, 0);
      // console.log(slot0, ethers.utils.hexlify(1));

      //uint
      await StorageUnwrapper.setUnsignedInteger(77);
      const slot1 = await ethers.provider.getStorageAt(addr, 1);
      // console.log(slot1, ethers.utils.hexlify(77));

      //fixedArray
      await StorageUnwrapper.setFixedArray(2, 777);
      // slot 2 is 0th index & slot 1 is 1st index of fixedArray
      const slot4 = await ethers.provider.getStorageAt(addr, 5);
      // console.log(slot4, ethers.utils.hexlify(777));

      //DynamicArray
      // still have doubts & only able to get 0th index value
      await StorageUnwrapper.setDynamicArray(7);
      await StorageUnwrapper.setDynamicArray(9);
      await StorageUnwrapper.setDynamicArray(91);
      await StorageUnwrapper.setDynamicArray(19);
      // the starting storage location of the dynamic array will return how many elements are stored in the array

      const findValue = ethers.utils.keccak256(
        ethers.utils.hexZeroPad(ethers.utils.hexlify(5), 32)
      );
      const slot5 = await ethers.provider.getStorageAt(addr, findValue);
      // console.log(slot5);

      //string
      const slot6 = await ethers.provider.getStorageAt(addr, 6);
      // console.log(slot6, ethers.utils.toUtf8String(slot6));

      //Bytes
      const slot7 = await ethers.provider.getStorageAt(addr, 7);
      // console.log(slot7, ethers.utils.toUtf8String(slot7));

      //Struct
      await StorageUnwrapper.setStruct();
      const slot8 = await ethers.provider.getStorageAt(addr, 8);
      const slot10 = await ethers.provider.getStorageAt(addr, 10);
      console.log(slot8, ethers.utils.toUtf8String(slot10));
    });
  });
});
