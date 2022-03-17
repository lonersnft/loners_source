// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  //REWARD TOKEN
  const LonerRewardToken = await hre.ethers.getContractFactory("LonerRewardToken");
  const RewardToken = await LonerRewardToken.deploy("LonerRewardToken", "LRT");

  await RewardToken.deployed();

  console.log("RewardToken deployed to:", RewardToken.address);

  //STAKING TOKEN
  const LonerStakeToken = await hre.ethers.getContractFactory("LonerStakeToken");
  const StakeToken = await LonerStakeToken.deploy("LonerStakeToken", "LST", RewardToken.address);

  await StakeToken.deployed();

  console.log("StakeToken deployed to:", StakeToken.address);

  //MINT CONTRACT
  const fMintContract = await hre.ethers.getContractFactory("LonerMint");
  const MintContract = await fMintContract.deploy("Loners NFT Collection", "LNRS", StakeToken.address);

  await MintContract.deployed();

  console.log("Mint Contract deployed to:", MintContract.address);

  // GIVE CORRECT OWNERSHIPS TO CONTRACTS
  await RewardToken.transferOwnership(StakeToken.address);
  await StakeToken.transferOwnership(MintContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
