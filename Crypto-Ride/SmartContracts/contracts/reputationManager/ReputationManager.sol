// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RatingReputation
 * @author Mitchell Tucker
 * TODO make rating modifier
 */

 contract ReputationManager {

    mapping(address => Stat) private users;

    struct Stat{
        uint256 rating;         // percent based from 5 star 100% == 5
        uint256 reputation;     // points for successful drive
        uint256 totalRating;
        uint256 count;          // Amount of rides
    }

    event StatsChanged(address user);

    modifier validRating(uint256 _rating){
        require(_rating <= 5,"Rating cant exceed 5 stars");
        _;
    }

    function getReputation(address user) 
    public
    view
    returns(Stat memory)
    {
        return(users[user]);
    }

    /**
    * @dev update stats
    * 
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

