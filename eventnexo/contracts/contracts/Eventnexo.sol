// SPDX-License-Identifier: MIT

// Eventnexo

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./EEventStorage.sol";
import "./ETicketStorage.sol";

contract Eventnexo is
    ERC721,
    ERC721URIStorage,
    ERC721Enumerable,
    Ownable,
    Pausable
{
    using Strings for uint256;
    EEventStorage _eEventStorage;
    ETicketStorage _eTicketStorage;

    string public baseURI;
    string public baseExtension = ".json";

    event NewEventCreated(uint256 eventId, address owner);
    event TicketMint(uint256 ticketId, address owner);
    event TicketTransfer(uint256 ticketId, address owner, address newOwner);

    constructor() ERC721("Eventnexo", "ENFT") {}

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    // create event
    function createEvent(
        string calldata title,
        string calldata description,
        string calldata image,
        string calldata nftUri,
        uint256 amount,
        uint256 maxTickets,
        uint256 eventDate
    ) public {
        _eEventStorage.createEvent(
            title,
            description,
            image,
            nftUri,
            amount,
            msg.sender,
            maxTickets,
            eventDate
        );

        uint256 eventId = _eEventStorage.getCurrentEventId();

        emit NewEventCreated(eventId, msg.sender);
    }

    // buy event
    function buyTicket(uint256 eventId, uint256 quantity) public payable {
        uint256 currentEventId = _eEventStorage.getCurrentEventId();

        //  Check if the event ID is valid
        require(
            eventId > 0 && eventId <= currentEventId,
            "Event ID must be within valid EventId range"
        );

        //  Get the Event struct

        (
            string memory title,
            string memory description,
            string memory image,
            string memory nftUri,
            address owner,
            uint256 amount,
            uint256 ticketStatus,
            uint256 maxTickets,
            uint256 totalTicketBought,
            uint256 eventDate
        ) = _eEventStorage.getEventInfo(eventId);

        _eTicketStorage.createTicket(msg.sender, quantity, eventId);

        uint256 ticketId = _eTicketStorage.getCurrentTicketId();

        _mint(msg.sender, ticketId);

        _setTokenURI(ticketId, nftUri);

        emit TicketMint(ticketId, msg.sender);
    }

    // buy event
    function transferTicket(uint256 ticketId, address newOwner) public payable {
        uint256 currenTicketId = _eTicketStorage.getCurrentTicketId();

        //  Check if the ticket ID is valid
        require(
            ticketId > 0 && ticketId <= currenTicketId,
            "Event ID must be within valid EventId range"
        );

        (uint256 quantity, address owner) = _eTicketStorage.getTicketInfo(
            ticketId
        );

        //  Check if the owner is the one calling this function
        require(
            owner != msg.sender,
            "You don't have access to transfer this ticket"
        );

        _eTicketStorage.transfer(ticketId, newOwner);

        _transfer(msg.sender, newOwner, ticketId);

        emit TicketTransfer(ticketId, msg.sender, newOwner);
    }

    function getTicketLength() public view returns (uint256) {
        return _eTicketStorage.getCurrentTicketId();
    }

    function getEventLength() public view returns (uint256) {
        return _eEventStorage.getCurrentEventId();
    }

    function getEvent(uint256 eventId)
        public
        view
        returns (
            string memory title,
            string memory description,
            string memory image,
            string memory nftUri,
            address owner,
            uint256 amount,
            uint256 ticketStatus,
            uint256 maxTickets,
            uint256 totalTicketBought,
            uint256 eventDate
        )
    {
        return _eEventStorage.getEventInfo(eventId);
    }

    function getTicket(uint256 ticketId)
        public
        view
        returns (uint256 quantity, address owner)
    {
        return _eTicketStorage.getTicketInfo(ticketId);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
