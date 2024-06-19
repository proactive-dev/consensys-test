// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCollateral.sol";

contract LendingBorrowing {
    NFTCollateral public nftCollateral;
    mapping(address => uint256) public loans;

    constructor(address _nftCollateralAddress) {
        nftCollateral = NFTCollateral(_nftCollateralAddress);
    }

    function borrow(uint256 _tokenId) public {
        require(nftCollateral.collateralValue(_tokenId) > 0, "NFT is not collateralized");
        require(nftCollateral.nftOwner(_tokenId) == msg.sender, "You are not the owner of this NFT");

        uint256 loanAmount = nftCollateral.collateralValue(_tokenId);
        loans[msg.sender] += loanAmount;
        payable(msg.sender).transfer(loanAmount);
    }

    function repay(uint256 _amount) public payable {
        require(loans[msg.sender] >= _amount, "Repaying more than borrowed amount");
        loans[msg.sender] -= _amount;
    }
}
