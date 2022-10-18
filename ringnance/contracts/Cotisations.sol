// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Cotisation {

    uint numberOfTontines = 0;
    uint numberOfGroups = 0;
    uint numberOfMembers = 0;

    struct Tontine {
        address payable owner;
        uint tontineId;
        string name;
        uint amount;
        uint beneficyingTimeInterval; 
    }

    struct Group {
        uint groupId;
        uint tontineId;
        uint numberOfGroupMembers;
    }

    struct Member{
        uint memberId;
        string name;
        address payable memberWalletAddress;
    }

    //mapping to track the differents structs
    mapping (uint => Tontine ) internal tontines;
    mapping (uint => Group) internal groups;
    mapping (uint => Member) internal members;
    

    //mapping between the differents structs
    mapping (uint => uint ) internal tontineGroup;
    mapping (uint => uint) groupMembers;
    


    function createTontine(string memory _name, uint _amount, uint _beneficyingTimeInterval) public {

        tontines[numberOfTontines+1] = Tontine (
            payable(msg.sender),
            numberOfTontines+1,
            _name,
            _amount,
            _beneficyingTimeInterval
        );
        
        createGroup(numberOfTontines+1);
        numberOfTontines++;
        
    }


    function createGroup(uint _tontineId) public {
        
        groups[numberOfGroups+1] = Group(
            numberOfGroups+1,
            _tontineId,
            1
        );

        tontineGroup[_tontineId] = numberOfGroups+1;
        numberOfGroups++;

        //After creating a group, we shall add him the creator (owner of tthe tontine) as a group member
        createMember("admin", payable(msg.sender));
        addMemberToGroup(members[numberOfMembers].memberId, numberOfGroups+1);
    }
    
    function createMember(string memory _name, address _memberWalletAddress) public {
        members[numberOfMembers+1] = Member(
            numberOfMembers+1,
            _name,
            payable(_memberWalletAddress)
        );

        numberOfMembers++;
        //After creating a member, we shall add him to a group
    }

    function addMemberToGroup (uint _memberId, uint _groupId) public {
        groupMembers[_memberId] = _groupId;
        groups[_groupId].numberOfGroupMembers++;
    }

    function listGroupOfTontine(uint _tontineId) public view returns (uint, uint, uint, uint) {
        uint groupId = tontineGroup[_tontineId];
        return (
            groups[groupId].tontineId,
            groups[groupId].numberOfGroupMembers,
            _tontineId,
            groupId
        );
    }

    function listMembersOfTontine(uint _tontineId) public view returns (uint) {
        uint groupId = tontineGroup[_tontineId];
        return groups[groupId].numberOfGroupMembers;
    }

    function showMembers (uint _memberId) public view returns (Member memory){
        return members[_memberId];
    }
    
}
