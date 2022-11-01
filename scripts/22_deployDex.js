const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0x73085793cD57703f686e1E6d4ee0F4A994eE1c89";
  const DexContract = await ethers.getContractFactory("Dex");
  const Dex = DexContract.attach(Instance);
  // const owners = await Dex.owner();
  // console.log(owners);
  // const token1 = await Dex.token1();
  // const token2 = await Dex.token2();
  const token1 = "0xfBba411D37026F4662347bbB02d17E821aC98668";
  const token2 = "0xa6cc82a73C6B0584EaAFFD97B8c9f2F6d2D4333d";
  const tx = await Dex.approve(Dex.address, "45");
  await tx.wait(1);
  const tx1 = await Dex.swap(token2, token1, "45");
  await tx1.wait(1);
  // 10,20,24,30,41,45
  const balance1 = await Dex.balanceOf(token1, owner.address);
  const balance2 = await Dex.balanceOf(token2, owner.address);
  const balance3 = await Dex.balanceOf(token1, Dex.address);
  const balance4 = await Dex.balanceOf(token2, Dex.address);
  console.log(balance1, balance2, balance3, balance4);
  // const tx = await Dex.addLiquidity(token1, ethers.utils.parseEther("1"));
  // tx.wait(1);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
