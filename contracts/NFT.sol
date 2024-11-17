// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;

    constructor() ERC721("DApp NFT", "DAPP") {}

    function mint(string memory _tokenURI) external returns (uint) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }

    function updateTokenURI(uint _tokenId, string memory _tokenURI) external {
        require(ownerOf(_tokenId) == msg.sender, "caller is not owner");
        _setTokenURI(_tokenId, _tokenURI);
    }
}
