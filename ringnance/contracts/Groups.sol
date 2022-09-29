// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./Members.sol";

contract Groups {

    struct Group {
        uint groupId;
        uint tontineId;
        uint numberOfMembers;
    }

    uint allGroups = 0;
    mapping (uint => Group) internal groups;

    function createGroup(uint _tontineId, uint _numberOfMembers) public {
        groups[allGroups] = Group(
            allGroups+1,
            _tontineId,
            _numberOfMembers
        );

        allGroups++;
        //After creating a member, we shall add him to a group
    }

    function showGroup(uint _groupId) public view returns (
        uint,
        uint
    ) {
        return (
            groups[_groupId].tontineId,
            groups[_groupId].numberOfMembers
        );
    }

    function getNumberOfGroups() public view returns(uint) {
        return allGroups;
    }


}