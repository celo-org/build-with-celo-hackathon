// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Group_Members {

    struct Member_Group {
        uint groupId; 
        uint memberId;
        bool memberIsValidated;
        uint memberFoodOrder;
    }

    mapping (uint => Member_Group ) internal member_groups;
    uint numberOfMemberGroups = 0;

    function createMemberGroup(uint _groupId, uint _memberId, bool _memberIsValidated, uint _memberFoodOrder) public {

        member_groups[numberOfMemberGroups] = Member_Group (
            _groupId,
            _memberId,
            _memberIsValidated,
            _memberFoodOrder
        );
        numberOfMemberGroups++;

        //After creating a tontine, the creator(owner) must be set as the first tontine member
    }

    function showMemberGroup(uint _memberGroupId) public view returns(
        uint,
        uint,
        bool,
        uint
        
    ){
        return (
            member_groups[_memberGroupId].groupId,
            member_groups[_memberGroupId].memberId,
            member_groups[_memberGroupId].memberIsValidated,
            member_groups[_memberGroupId].memberFoodOrder
        );  
    }

    function getNumberOfMemberGroups() public view returns (uint) {
        return numberOfMemberGroups;
    }


}