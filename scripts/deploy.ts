import { ethers } from 'hardhat';

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);

    const NFTCollateral = await ethers.getContractFactory('NFTCollateral');
    const nftCollateral = await NFTCollateral.deploy('0xYourNFTContractAddress');
    await nftCollateral.deployed();
    console.log('NFTCollateral deployed to:', nftCollateral.address);

    const LendingBorrowing = await ethers.getContractFactory('LendingBorrowing');
    const lendingBorrowing = await LendingBorrowing.deploy(nftCollateral.address);
    await lendingBorrowing.deployed();
    console.log('LendingBorrowing deployed to:', lendingBorrowing.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
