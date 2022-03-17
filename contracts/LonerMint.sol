// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "./LonerStakeToken.sol";


contract LonerMint is ERC721, Ownable, PaymentSplitter{
    using Strings for uint256;

    address[] private shareAddresses = [0x0000000000000000000000000000000000000000];
    uint[] private shares_ = [100];
    uint256 private nftId = 1;

    LonerStakeToken public LST;
    
    constructor(string memory name, string memory symbol, address staketoken) ERC721(name, symbol) PaymentSplitter(shareAddresses, shares_) {
        // Loner Collection # 1 - LNR for example
        LST = LonerStakeToken(staketoken);
    }

    function baseTokenURI() public view virtual returns (string memory) {
        return "ipfs://QmNnWnaF3K5xcFCvoQfNv7XKHjxs3bDFcQ9TMAXBtciXVM/";
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), _tokenId.toString(), ".json"));
    }

    function mintamount() public view virtual returns (uint256) {
        return nftId;
    }

    function mint() public payable virtual {
        require(msg.value == 0.1 ether, "You need to pay 0.1 Matic to mint");
        require(nftId <= 10000, "Loners mint limit reached");
        LST._mint(msg.sender, 1000 * 10 ** 18);
        _safeMint(msg.sender, nftId);
        nftId++;
    }
}