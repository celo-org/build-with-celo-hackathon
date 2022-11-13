// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RatingReputation
 * @author Mitchell Tucker
 * @dev Creates and manages a rating and reputation system for addresses
 */
 contract ReputationManager {

    struct Stat{
        uint256 rating;         // percent based from 5 star 100% == 5
        uint256 reputation;     // points for successful drive
        uint256 totalRating;    // Amount of ratings
        uint256 count;          // Amount of rides
    }

    mapping(address => Stat) private users;

    event StatsChanged(address user);

    modifier validRating(uint256 _rating){
        require(_rating <= 5,"Rating cant exceed 5 stars");
        _;
    }
    /**
    * @dev setDriverWindow  
    *
    * @param user address of the user to return reputation
    *
    */
    function getReputation(address user) 
    public
    view
    returns(Stat memory)
    {
        return(users[user]);
    }

    /**
    * @dev update Reputation
    * @param _user address to update reputation on
    * @param _rating uint256 new address rating 
    * @param _reputation uint256 amount to increase/decrease reputation
    * @param decrease bool whether to increase or decrease reputation
    */
    function updateReputation(address _user,uint256 _rating, uint256 _reputation, bool decrease) 
    internal
    {
        Stat memory userStat = users[_user];
        userStat.count += 1;
        userStat.totalRating += _rating;
        userStat.rating = userStat.totalRating /  userStat.count;
        if(decrease){
            if(userStat.reputation > _reputation){
                userStat.reputation -= _reputation; 
            }else{
                userStat.reputation = 0;
            }
             
        }else {
            userStat.reputation += _reputation; 
        }
       
        users[_user] = userStat;
        emit StatsChanged(_user);
    }



}

