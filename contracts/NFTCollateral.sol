// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTCollateral {
    IERC721 public nft;
    mapping(uint256 => address) public nftOwner;
    mapping(uint256 => uint256) public collateralValue;

    constructor(address _nftAddress) {
        nft = IERC721(_nftAddress);
    }

    function collateralizeNFT(uint256 _tokenId, uint256 _value) public {
        require(nft.ownerOf(_tokenId) == msg.sender, "You are not the owner of this NFT");
        nft.transferFrom(msg.sender, address(this), _tokenId);
        nftOwner[_tokenId] = msg.sender;
        collateralValue[_tokenId] = _value;
    }

    function releaseNFT(uint256 _tokenId) public {
        require(nftOwner[_tokenId] == msg.sender, "You are not the owner of this NFT");
        nft.transferFrom(address(this), msg.sender, _tokenId);
        delete nftOwner[_tokenId];
        delete collateralValue[_tokenId];
    }
}
