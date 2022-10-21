//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Superstream {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    // Events
    event ProfileCreated(Profile _profile);
    event StreamPublished(uint256 streamNftId, address indexed creator);
    event Followed(string indexed _from, string indexed _to);
    event Tipped(
        address indexed sender,
        address indexed receiver,
        uint256 amount
    );
    event CommentAdded(Comment comment,string indexed topic,uint256 createdAt);
    event Subscribed(address indexed from,address indexed toAddress,string toUsername, uint256 flowRate);
    event Unsubscribed(address indexed subscriber,string indexed creator);
    event LivestreamInfoUpdated(address indexed creator,string newTitle);
    event SubscriptionChargeUpdated(address indexed creator,uint256 newFlowRate);    
    event VideoViewed(uint indexed id,address viewer);
    // event Liked(uint256 indexed id,address indexed likedBy);

    //Structs
    struct Stream {
        string creator;
        string sessionId;
        uint256 id;
        uint256 views;
        bool isSubscribersOnly;
    }

    struct Profile {
        uint256 id;
        uint256 subscriptionCharge; // flow rate  
        uint256 subscribersCount;
        bool isOnlySubscribers;
        string username;
        string bio;
        string pfp;
        string streamId;
        string defaultTitle;
        string defaultThumbnail;
        string[] followers;
        string[] follows;
        address owner;           
    }

    struct Comment {
        uint256 createdAt;
        string topic; // topic will be video id for published videos & username for livechat
        string message;
        string senderUsername;
        address senderAddress;
    }

    struct Subscription{
        uint256 startedAt;
        uint256 flowRate; // Superfluid flow rate per second
        string toUsername;
        address toAddress;
        address fromAddress;
    }

    uint256 profileId = 1;
    mapping(uint256 => Stream) streams; // Stream NFT ID to stream
    mapping(address => string) private addressToStreamKey;
    mapping(string => Profile) private usernameToProfile; // username to ProfileId
    mapping(address => string) addressToUsername;
    mapping(string => bool) public usernameTaken;
    mapping(string => bool) public isPublished;
    mapping(string => Comment[]) private commentsByTopic;
    mapping(address => mapping(string => Subscription)) subscriptions; // senderAddress => Channel Username => subscription

   

    // Profile Function
    function addProfile(
        string memory _username,
        string memory _bio,
        string memory _pfp,
        string memory _streamId,
        string memory _streamKey) public {
        require(!usernameTaken[_username], "Username is Already Taken!");

        Profile memory newProfile;
        newProfile.username = _username;
        newProfile.streamId = _streamId;
        newProfile.bio = _bio;
        newProfile.pfp = _pfp;
        newProfile.defaultThumbnail = "";
        newProfile.defaultTitle = "Default Stream Title";
        newProfile.owner = msg.sender;

        usernameTaken[_username] = true;
        usernameToProfile[_username] = newProfile;
        addressToUsername[msg.sender] = _username;
        addressToStreamKey[msg.sender] = _streamKey;

        emit ProfileCreated(newProfile);
        profileId++;
    }

    function getProfileByUsername(string memory _username)
        public
        view
        returns (Profile memory){
        require(usernameToProfile[_username].owner != address(0),"Profile does not exist");
        return usernameToProfile[_username];
    }

    function getProfileByAddress() public view returns (Profile memory) {
       return usernameToProfile[addressToUsername[msg.sender]];
    }

    function tip(address receiver, uint256 _amount) public payable {
        (bool success, ) = payable(receiver).call{value: _amount}("");
        require(success == true, "Failed to send Tip");
        emit Tipped(msg.sender, receiver, _amount);
    }

    function follow(string memory _to) public {
        string memory _from = addressToUsername[msg.sender];
        usernameToProfile[_from].follows.push(_to);
        usernameToProfile[_to].followers.push(_from);
        emit Followed(_from, _to);
    }

    function setStreamInfo(string memory _title,string memory _thumbnail) public {
        require(usernameToProfile[addressToUsername[msg.sender]].owner == msg.sender,"Unauthorized");
        usernameToProfile[addressToUsername[msg.sender]].defaultThumbnail = _thumbnail;        
        usernameToProfile[addressToUsername[msg.sender]].defaultTitle = _title;        
        emit LivestreamInfoUpdated(msg.sender, _title);
    }

    function setSubscriptionCharge(uint _flowRate) public {
        require(usernameToProfile[addressToUsername[msg.sender]].owner == msg.sender,"Unauthorized");
        usernameToProfile[addressToUsername[msg.sender]].subscriptionCharge = _flowRate;
        emit SubscriptionChargeUpdated(msg.sender, _flowRate);
    }

    function toggleSubOnlyForLiveStream() public{
        Profile storage profile = usernameToProfile[addressToUsername[msg.sender]];
        require(profile.owner == msg.sender,"Unauthorized");
        if(profile.isOnlySubscribers == true){
            profile.isOnlySubscribers = false;
        } else {
            profile.isOnlySubscribers = true;
        }
    }
     
    // Session Functions
    function addStream(uint256 _streamNftId, string memory _sessionId,bool _isSubscribersOnly) public {
        Stream memory newStream;
        newStream.sessionId = _sessionId;
        newStream.id = _streamNftId;
        newStream.creator = addressToUsername[msg.sender];
        newStream.isSubscribersOnly = _isSubscribersOnly;
        streams[_streamNftId] = newStream;
        isPublished[_sessionId] = true;
        emit StreamPublished(_streamNftId, msg.sender);
    }
        
    function getStreamKey() public view returns (string memory) {
        return addressToStreamKey[msg.sender];
    }

    function getSessionId(uint256 _id) public view returns (string memory) {
        require(keccak256(abi.encodePacked(addressToUsername[msg.sender])) == keccak256(abi.encodePacked(streams[_id].creator)),"Unauthorized");
        require(keccak256(abi.encodePacked(streams[_id].sessionId)) != keccak256(abi.encodePacked("")),"Stream Does Not Exist");
        return (streams[_id].sessionId);
    }

    function getSessionData(uint256 _id) public view returns (Stream memory) {
                require(keccak256(abi.encodePacked(streams[_id].sessionId)) != keccak256(abi.encodePacked("")),"Stream Does Not Exist");
                return streams[_id];
    }

    function getSessionWithViewIncrement(uint256 _id)
        public
        returns (Stream memory){
        require(keccak256(abi.encodePacked(streams[_id].sessionId)) != keccak256(abi.encodePacked("")),"Stream Does Not Exist");
        if(streams[_id].isSubscribersOnly == true){
            require(subscriptions[msg.sender][streams[_id].creator].fromAddress == msg.sender,"Unauthorized");
            streams[_id].views++;
            return streams[_id];
        }
        streams[_id].views++;
        emit VideoViewed(_id,msg.sender);
        return streams[_id];
    }

    function isSubscriber(string calldata username) public view returns(bool) {
        if(subscriptions[msg.sender][username].toAddress == usernameToProfile[username].owner){
            return true;
        } 
        return false; 
    }

    function toggleSubOnlyForPublishedStream(uint256 _id) public {
        require(msg.sender == usernameToProfile[addressToUsername[msg.sender]].owner,"Unauthorized");
        if(streams[_id].isSubscribersOnly == true) {
            streams[_id].isSubscribersOnly = false;
        } else {
            streams[_id].isSubscribersOnly = true;
        }
    }
    
    // Comments Functions

    function getComments(string calldata _topic)
        public
        view
        returns (Comment[] memory){
        return commentsByTopic[_topic];
    }

    function addComment(
        string memory _topic,
        string memory _message) public {
        Comment memory comment = Comment({
            topic: _topic,
            message: _message,
            senderAddress: msg.sender,
            senderUsername: addressToUsername[msg.sender],
            createdAt: block.timestamp
        });
        commentsByTopic[_topic].push(comment);
        emit CommentAdded(comment, _topic, block.timestamp);
    }

    // Subscription Functions
    function subscribe(string memory _toUsername,uint256 _flowRate) public {
        require(subscriptions[msg.sender][_toUsername].toAddress == address(0),"Subscription already exist");
        require(usernameToProfile[_toUsername].subscriptionCharge <= _flowRate,"Insufficient flow rate");
        address _toAddress = usernameToProfile[_toUsername].owner;
        subscriptions[msg.sender][_toUsername] = Subscription({
            startedAt:block.timestamp,
            flowRate:_flowRate,
            toUsername:_toUsername,
            toAddress:_toAddress,
            fromAddress:msg.sender
        });
        usernameToProfile[_toUsername].subscribersCount++;
        emit Subscribed(msg.sender, _toAddress, _toUsername, _flowRate);   
    } 

    function unsubscribe(string memory _toUsername) public {
        require(subscriptions[msg.sender][_toUsername].toAddress != address(0),"Subscription does not exist");
        usernameToProfile[_toUsername].subscribersCount--;
        delete subscriptions[msg.sender][_toUsername];
        emit Unsubscribed(msg.sender, _toUsername);
    }

    function getSubscriptionInfo(string memory _toUsername) public view returns(Subscription memory) {
        require(subscriptions[msg.sender][_toUsername].toAddress != address(0),"Subscription does not exist");
        return subscriptions[msg.sender][_toUsername];
    } 
    // Owner Functions
}