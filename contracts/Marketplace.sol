// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;

    // Variables
    address payable public immutable feeAccount; // the account that receives fees
    uint public immutable feePercent; // the fee percentage on sales 
    Counters.Counter private itemCount;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    // itemId -> Item
    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );
    event Canceled(
        uint itemId,
        address indexed nft,
        uint tokenId,
        address indexed seller
    );

    constructor(uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    // Make item to offer on the marketplace
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount.increment();
        uint currentItemId = itemCount.current();
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        items[currentItemId] = Item(
            currentItemId,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
        emit Offered(
            currentItemId,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount.current(), "item doesn't exist");
        require(msg.value >= _totalPrice, "not enough ether to cover item price and market fee");
        require(!item.sold, "item already sold");
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        item.sold = true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function cancelSale(uint _itemId) external nonReentrant {
        Item storage item = items[_itemId];
        require(item.seller == msg.sender, "not the seller");
        require(!item.sold, "item already sold");
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        delete items[_itemId];
        emit Canceled(
            _itemId,
            address(item.nft),
            item.tokenId,
            msg.sender
        );
    }

    function getTotalPrice(uint _itemId) view public returns (uint) {
        return ((items[_itemId].price * (100 + feePercent)) / 100);
    }

    function withdraw() external {
        require(msg.sender == feeAccount, "not the fee account");
        feeAccount.transfer(address(this).balance);
    }

    function getItemCount() view public returns (uint) {
        return itemCount.current();
    }
}
