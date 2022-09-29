// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Members {

    struct Member{
        uint memberId;
        string name;
        address payable memberWalletAddress;
    }

    mapping (uint => Member) internal members;
    uint AllMembers = 0;

    function createMember(string memory _name, address _memberWalletAddress) public {
        members[AllMembers] = Member(
            AllMembers+1,
            _name,
            payable(_memberWalletAddress)
        );

        AllMembers++;
        //After creating a member, we shall add him to a group
    }

    function showMemberById(uint _memberId) public view returns (
        string memory,
        address
    ) {
        return (
            members[_memberId].name,
            members[_memberId].memberWalletAddress
        );
    }

    function showMemberByAddress(address _memberAddress) public view returns (
        string memory,
        uint
    ) {
        return (
            members[_memberId].name,
            members[_memberId].memberId
        );
    }

    function getNumberOfMembers() public view returns(uint) {
        return AllMembers;
    }

}