//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventHub {
    string[] eventIds;

    event NewEventCreated(
        string eventID,
        address creatorAddress,
        uint256 eventTimestamp,
        uint256 maxCapacity,
        uint256 deposit,
        string eventDataCID
    );

    event Payout(string Message);

    event NewRSVP(string eventID, address attendeeAddress);

    event ConfirmedAttendee(string eventID, address attendeeAddress);

    event DepositsPaidOut(string eventID);

    struct CreateEvent {
        string eventId;
        string eventDataCID;
        address eventOwner;
        uint256 eventTimestamp;
        uint256 deposit;
        uint256 maxCapacity;
        address payable[] confirmedRSVPs;
        address payable[] claimedRSVPs;
        address payable[] payedAttendees;
        bool paidOut;
    }

    mapping(string => CreateEvent) public idToEvent;

    function createNewEvent(
        uint256 eventTimestamp,
        uint256 deposit,
        uint256 maxCapacity,
        string calldata eventDataCID,
        string calldata eventId
    ) external {

        address payable[] memory confirmedRSVPs;
        address payable[] memory claimedRSVPs;
        address payable[] memory payedAttendees;

        idToEvent[eventId] = CreateEvent(
            eventId,
            eventDataCID,
            msg.sender,
            eventTimestamp,
            deposit,
            maxCapacity,
            confirmedRSVPs,
            claimedRSVPs,
            payedAttendees,
            false
        );

        emit NewEventCreated(
            eventId,
            msg.sender,
            eventTimestamp,
            maxCapacity,
            deposit,
            eventDataCID
        );

        eventIds.push(eventId);
    }

//    function createNewRSVP(string calldata eventId) public returns(uint256) {
    function createNewRSVP(string calldata eventId) public payable {
        CreateEvent storage myEvent = idToEvent[eventId];

        require(msg.value == myEvent.deposit, "NOT ENOUGH");
        require(block.timestamp <= myEvent.eventTimestamp, "ALREADY HAPPENED");
        require(myEvent.confirmedRSVPs.length < myEvent.maxCapacity, "This event has reached capacity");

        for (uint8 i = 0; i < myEvent.confirmedRSVPs.length; i++) {
            require(myEvent.confirmedRSVPs[i] != msg.sender, "ALREADY CONFIRMED");
        }

        myEvent.confirmedRSVPs.push(payable(msg.sender));
        emit NewRSVP(eventId, msg.sender);
    }

    function confirmAllAttendees(string calldata eventId) external {
        CreateEvent memory myEvent = idToEvent[eventId];

        require(msg.sender == myEvent.eventOwner, "NOT AUTHORIZED");

        for (uint8 i = 0; i < myEvent.confirmedRSVPs.length; i++) {
            confirmAttendee(eventId, myEvent.confirmedRSVPs[i]);
        }
    }

    function confirmAttendee(string memory eventId, address attendee) public {
        // look up event from our struct using the eventId


        CreateEvent storage myEvent = idToEvent[eventId];
        // require that msg.sender is the owner of the event - only the host should be able to check people in
        require(msg.sender == myEvent.eventOwner, "NOT AUTHORIZED");

        // require that attendee trying to check in actually RSVP'd
        address rsvpConfirm;

        for (uint8 i = 0; i < myEvent.confirmedRSVPs.length; i++) {
            if (myEvent.confirmedRSVPs[i] == attendee) {
                rsvpConfirm = myEvent.confirmedRSVPs[i];
            }
        }

        require(rsvpConfirm == attendee, "NO RSVP TO CONFIRM");

        // require that attendee is NOT already in the claimedRSVPs list AKA make sure they haven't already checked in
        for (uint8 i = 0; i < myEvent.claimedRSVPs.length; i++) {
            require(myEvent.claimedRSVPs[i] != attendee, "ALREADY CLAIMED");
        }
//        return test;

        // require that deposits are not already claimed by the event owner
        require(myEvent.paidOut == false, "ALREADY PAID OUT");

        // add the attendee to the claimedRSVPs list
        myEvent.claimedRSVPs.push(payable(attendee));

        // sending eth back to the staker `https://solidity-by-example.org/sending-ether`
//        (bool sent, ) = attendee.call{value: myEvent.deposit}("");

        // if this fails, remove the user from the array of claimed RSVPs
//        if (!sent) {
//            myEvent.claimedRSVPs.pop();
//        }
//
//        require(sent, "Failed to send Ether");
//        emit ConfirmedAttendee(eventId, attendee);
    }

    function withdrawUnclaimedDeposits(string calldata eventId) external {
        // look up event
        CreateEvent memory myEvent = idToEvent[eventId];

        // check that the paidOut boolean still equals false AKA the money hasn't already been paid out
        require(!myEvent.paidOut, "ALREADY PAID");

        // check if it's been 7 days past myEvent.eventTimestamp
//        require(block.timestamp >= (myEvent.eventTimestamp + 7 days), "TOO EARLY");
//        require(block.timestamp >= (myEvent.eventTimestamp + 2 minutes), "TOO EARLY");

        // only the event owner can withdraw
        require(msg.sender == myEvent.eventOwner, "MUST BE EVENT OWNER");

        // calculate how many people didn't claim by comparing
        uint256 unclaimed = myEvent.confirmedRSVPs.length -
            myEvent.claimedRSVPs.length;

        uint256 payout = unclaimed * myEvent.deposit;

        // mark as paid before sending to avoid reentrancy attack
        myEvent.paidOut = true;

        // send the payout to the owner
        (bool sent, ) = msg.sender.call{value: payout}("");

        // if this fails
        if (!sent) {
            myEvent.paidOut = false;
        }

        require(sent, "Failed to send Ether");
//        emit DepositsPaidOut(eventId);
    }

    function getEventId(uint i) public view returns (string memory) {
        return eventIds[i];
    }

    function getEvent(string calldata eventID) public view returns (
        string memory eventDataCID,
        address eventOwner,
        uint256 eventTimestamp,
        uint256 maxCapacity,
        uint256 deposit,
        string memory eventId
    ) {
        return (
        idToEvent[eventID].eventDataCID,
        idToEvent[eventID].eventOwner,
        idToEvent[eventID].eventTimestamp,
        idToEvent[eventID].maxCapacity,
        idToEvent[eventID].deposit,
        idToEvent[eventID].eventId
        );
    }

    function getEventLength() public view returns (uint) {
        return eventIds.length;
    }

    function getConfirmedRSVPs(string calldata eventId) public view returns (address payable[] memory) {
        CreateEvent storage myEvent = idToEvent[eventId];
        return myEvent.confirmedRSVPs;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function payOut(string memory eventId) public {
        CreateEvent storage myEvent = idToEvent[eventId];

        uint256 absentees = myEvent.confirmedRSVPs.length - myEvent.claimedRSVPs.length;

        uint256 unclaimed = absentees * myEvent.deposit;

        uint256 share = unclaimed / myEvent.claimedRSVPs.length;

        for (uint8 i = 0; i < myEvent.claimedRSVPs.length; i++) {
            myEvent.payedAttendees.push(payable(myEvent.claimedRSVPs[i]));
            (bool sent, ) = myEvent.claimedRSVPs[i].call{value: (share + myEvent.deposit)}("");

            if (!sent) {
                myEvent.payedAttendees.pop;
            }

            require(sent, "Failed to send Ether");
        }
        emit DepositsPaidOut(eventId);

    }
}


