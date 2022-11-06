// SPDX-License-Identifier: MIT

// Eventnexo Event Storage

pragma solidity ^0.8.0;
import "./SafeMath.sol";

contract ETicketStorage {
    using SafeMath for uint256;

    // currenct ticket id
    uint256 currentTicketId;

    struct ETicketStruct {
        uint256 eventId;
        uint256 quantity;
        address owner;
    }

    mapping(uint256 => ETicketStruct) eTicketCycles;

    function getCurrentTicketId() external view returns (uint256) {
        return currentTicketId;
    }

    function createTicket(
        address owner,
        uint256 quantity,
        uint256 eventId
    ) external {
        currentTicketId += 1;
        ETicketStruct storage tStruct = eTicketCycles[currentTicketId];
        tStruct.eventId = eventId;
        tStruct.owner = owner;
        tStruct.quantity = quantity;
    }

    function transfer(uint256 ticketId, address newOwner)
        external
        isTicketValid(ticketId)
    {
        ETicketStruct storage cycle = eTicketCycles[ticketId];

        cycle.owner = newOwner;
    }

    function getTicketInfo(uint256 ticketId)
        external
        view
        isTicketValid(ticketId)
        returns (uint256 quantity, address owner)
    {
        ETicketStruct memory cycle = eTicketCycles[ticketId];

        return (cycle.quantity, cycle.owner);
    }

    modifier isTicketValid(uint256 ticketId) {
        require(
            ticketId != 0 && ticketId <= currentTicketId,
            "Ticket ID must be within valid TicketId range"
        );
        _;
    }
}
