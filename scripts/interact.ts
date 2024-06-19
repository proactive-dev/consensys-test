import { ethers } from 'ethers';
import NFTCollateral from './artifacts/contracts/NFTCollateral.sol/NFTCollateral.json';
import LendingBorrowing from './artifacts/contracts/LendingBorrowing.sol/LendingBorrowing.json';

// Infura provider
// const infuraProvider = new ethers.providers.InfuraProvider('mainnet', 'YOUR_INFURA_PROJECT_ID');

// MetaMask provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const nftCollateralAddress = '0xDeployedNFTCollateralAddress';
const lendingBorrowingAddress = '0xDeployedLendingBorrowingAddress';

const nftCollateralContract = new ethers.Contract(nftCollateralAddress, NFTCollateral.abi, signer);
const lendingBorrowingContract = new ethers.Contract(lendingBorrowingAddress, LendingBorrowing.abi, signer);

async function collateralizeNFT(tokenId: number, value: number) {
    try {
        const tx = await nftCollateralContract.collateralizeNFT(tokenId, value);
        await tx.wait();
        console.log('NFT Collateralized:', tx);
    } catch (error) {
        console.error('Error collateralizing NFT:', error);
    }
}

async function borrow(tokenId: number) {
    try {
        const tx = await lendingBorrowingContract.borrow(tokenId);
        await tx.wait();
        console.log('Funds Borrowed:', tx);
    } catch (error) {
        console.error('Error borrowing funds:', error);
    }
}

async function repay(amount: number) {
    try {
        const tx = await lendingBorrowingContract.repay({ value: ethers.utils.parseEther(amount.toString()) });
        await tx.wait();
        console.log('Funds Repaid:', tx);
    } catch (error) {
        console.error('Error repaying funds:', error);
    }
}

// MetaMask integration for account connection
async function connectWallet() {
    try {
        await provider.send('eth_requestAccounts', []);
        console.log('Wallet connected');
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

// Call connectWallet to ensure the wallet is connected
connectWallet();
