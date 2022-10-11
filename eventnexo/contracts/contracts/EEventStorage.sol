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
        string description;
        uint256 totalTicketAcquired;
        uint256 totalMembers;
        uint256 maxTickets;
        address owner;
        EEventStatus status;
    }

    

    mapping(uint256 => EEventStruct) eventCycles;
    
    mapping(uint256 => mapping(address => uint256)) esusuCycleBeneficiary;
    mapping(uint256 => mapping(address => uint256)) esusuMemberWithdrawnCapital;
}
