// SPDX-License-Identifier: MIT

// Eventnexo Event Storage

pragma solidity ^0.8.0;
import "./SafeMath.sol";

contract EEventStorage {
    using SafeMath for uint256;

    // currenct event id
    uint256 currentEventId;

    // EEventStatus Struct
    enum EEventStatus {
        Start,
        End
    }

    // EEventStruct Struct
    struct EEventStruct {
        uint256 amount;
        string title;
        string image;
        string nftUri;
        string description;
        uint256 totalTicketBought;
        uint256 maxTickets;
        address owner;
        uint256 eventDate;
        EEventStatus ticketStatus;
    }

    mapping(uint256 => EEventStruct) eventCycles;

    mapping(uint256 => mapping(address => uint256)) esusuCycleBeneficiary;
    mapping(uint256 => mapping(address => uint256)) esusuMemberWithdrawnCapital;

    // Create Event
    function createEvent(
        string calldata title,
        string calldata description,
        string calldata image,
        string calldata nftUri,
        uint256 amount,
        address owner,
        uint256 maxTickets,
        uint256 eventDate
    ) external {
        currentEventId += 1;
        EEventStruct storage eStruct = eventCycles[currentEventId];
        eStruct.title = title;
        eStruct.image = image;
        eStruct.nftUri = nftUri;
        eStruct.maxTickets = maxTickets;
        eStruct.description = description;
        eStruct.ticketStatus = EEventStatus.Start;
        eStruct.owner = owner;
        eStruct.eventDate = eventDate;
        eStruct.amount = amount;
    }

    function increaseNumberOfTicketBought(uint256 eventId, uint256 quantity)
        external
        isEventIdValid(eventId)
        returns (uint256)
    {
        EEventStruct storage cycle = eventCycles[eventId];

        uint256 totalTicketBought = cycle.totalTicketBought.add(quantity);

        cycle.totalTicketBought = totalTicketBought;

        return totalTicketBought;
    }

    function updateEventStatus(uint256 esusuCycleId, uint256 status) external {
        EEventStruct storage cycle = eventCycles[esusuCycleId];

        cycle.ticketStatus = EEventStatus(status);
    }

    function getEventInfo(uint256 eventId)
        external
        view
        isEventIdValid(eventId)
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
        EEventStruct memory cycle = eventCycles[eventId];

        return (
            cycle.title,
            cycle.description,
            cycle.image,
            cycle.nftUri,
            cycle.owner,
            cycle.amount,
            uint256(cycle.ticketStatus),
            cycle.maxTickets,
            cycle.totalTicketBought,
            cycle.eventDate
        );
    }

    function getCurrentEventId() external view returns (uint256) {
        return currentEventId;
    }

    modifier isEventIdValid(uint256 eventId) {
        require(
            eventId != 0 && eventId <= currentEventId,
            "Event ID must be within valid EventId range"
        );
        _;
    }
}
