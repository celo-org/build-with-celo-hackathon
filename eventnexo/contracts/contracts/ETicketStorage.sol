// SPDX-License-Identifier: MIT

// Eventnexo Event Storage

pragma solidity ^0.8.0;
import "./SafeMath.sol";

contract ETicketStorage {
    using SafeMath for uint256;

    // currenct ticket id
    uint256 currentTicketId;

    // EsusuCycleMember Struct
    struct ETicketStruct {
        uint256 eventId;
        address owner;
    }

    mapping(address => mapping(uint256 => ETicketStruct)) eTicketCycles;
}
