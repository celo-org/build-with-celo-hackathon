// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RatingReputation
 * @author Mitchell Tucker
 * TODO make rating modifier
 */

 contract ReputationManager {

    mapping(address => Stat) users;

    struct Stat{
        uint256 rating;         // percent based from 5 star 100% == 5
        uint256 reputation;     // points for successful drive
        uint256 count;          // Amount of rides
    }

    event StatsChanged(address user);

    modifier withinRange(uint256 _rating){
        require(_rating <= 5,"Rating cant exceed 5 stars");
        _;
    }

    /**
    * @dev update stats
    */
    function updateReputation(address _user,uint256 _rating, uint256 _reputation, bool decrease) 
    internal
    {
        //require(_rating <= 5,"Rating cant exceed 5 stars");
        Stat memory userStat = users[_user];
        userStat.count += 1;
        userStat.rating = (_rating + userStat.rating) / 5; // need to round by 5 star
        if(decrease){
             userStat.reputation -= _reputation; // Check for overflow
        }else {
            userStat.reputation += _reputation; 
        }
       
        users[_user] = userStat;
        emit StatsChanged(_user);
    }



}

