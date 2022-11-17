// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

/// @title A contract for decentralized audit marketplace
contract Auditor is VRFConsumerBaseV2, KeeperCompatibleInterface {
	struct Audit {
		address creator;
		address contractAddress;
		address[5] jury;
		address[] yesPoolFunders;
		address[] noPoolFunders;
		address[] bugReporters;
		uint256 createdTime;
		uint256 lastStreamTime;
		uint256 totalYesPool;
		uint256 totalNoPool;
		mapping(address => uint256) yesPool;
		mapping(address => uint256) noPool;
		mapping(address => Bug[]) reporterToBugs;
	}

	struct Bug {
		uint256 createdTime;
		bool[5] juryMemberHasVoted;
		uint256 verdict;
		uint8 status; // 0 for pending, 1 for rejected, 2 for approved
	}

	address[] public eligibleJuryMembers;
	address[] public contractsAudited;
	mapping(address => Audit) public audits;
	mapping(address => address[]) public juryMemberToAudits;

	// global variables for Chainlink VRF
	VRFCoordinatorV2Interface COORDINATOR;
	uint64 vrfSubscriptionId;
	address vrfCoordinator = ; // coordinator address
	bytes32 keyHash = ; // keyHash 
	uint32 callbackGasLimit = 2000000;
	uint16 requestConfirmations = 3;
	uint32 numMembers = 5; // 5 jury members needed per audit
	mapping(uint256 => address) requestToAudit;

	// global variables for Chainlink Keepers
	uint256 public immutable interval = 1 days;
	uint256 public immutable timeToDrainFunds = 30 days;

	// custom events
	event AuditRequested(address indexed creator, address indexed contractAddress, uint256 timestamp);
	event AuditCompleted(
		address indexed creator,
		address indexed contractAddress,
		uint256 timestamp,
		bool verdict
	);
	event AuditCancelled(address indexed creator, address indexed contractAddress, uint256 timestamp);
	event AuditJuryUpdated(address indexed contractAddress, uint256 timestamp, address[5] jury);
	event AuditYesPoolUpdated(
		address indexed contractAddress,
		address indexed voter,
		uint256 totalYesPool
	);
	event AuditNoPoolUpdated(
		address indexed contractAddress,
		address indexed voter,
		uint256 totalNoPool
	);
	event NewBugReported(
		address indexed contractAddress,
		address indexed reporter,
		uint256 timestamp
	);
	event JuryMemberAdded(address indexed memberAddress, uint256 timestamp);
	event JuryVoteOnBug(
		address indexed contractAddress,
		address indexed reporter,
		address indexed juryMember,
		uint256 bugIndex
	);

	// custom modifiers
	modifier equallyFunded() {
		require(msg.value > 0 && msg.value % 2 == 0, "Must be equally funded!");
		_;
	}

	constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
		COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
		vrfSubscriptionId = subscriptionId;
	}

	function requestRandomWords(address contractAddress) internal {
		uint256 requestId = COORDINATOR.requestRandomWords(
			keyHash,
			vrfSubscriptionId,
			requestConfirmations,
			callbackGasLimit,
			numMembers
		);
		requestToAudit[requestId] = contractAddress;
	}

	function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
		address contractAddress = requestToAudit[requestId];

		for (uint8 i = 0; i < 5; i++) {
			audits[contractAddress].jury[i] = eligibleJuryMembers[
				randomWords[i] % eligibleJuryMembers.length
			];
			juryMemberToAudits[audits[contractAddress].jury[i]].push(contractAddress);
		}

		emit AuditJuryUpdated(contractAddress, block.timestamp, audits[contractAddress].jury);
	}

	function createAudit(address contractAddress) external payable equallyFunded {
		require(
			audits[contractAddress].createdTime != block.timestamp,
			"audit exists for given contract"
		);

		requestRandomWords(contractAddress);

		Audit storage newAudit = audits[contractAddress];
		contractsAudited.push(contractAddress);

		newAudit.creator = msg.sender;
		newAudit.contractAddress = contractAddress;
		newAudit.createdTime = block.timestamp;
		newAudit.lastStreamTime = block.timestamp;
		newAudit.totalYesPool = msg.value / 2;
		newAudit.totalNoPool = msg.value / 2;

		newAudit.yesPool[msg.sender] = newAudit.totalYesPool;
		newAudit.yesPoolFunders.push(msg.sender);
		newAudit.noPool[msg.sender] = newAudit.totalNoPool;
		newAudit.noPoolFunders.push(msg.sender);

		emit AuditRequested(msg.sender, contractAddress, block.timestamp);
	}

	function fundNoBugsPool(address contractAddress) external payable {
		// will have to add streaming payments
		audits[contractAddress].totalNoPool += msg.value;
		audits[contractAddress].noPool[msg.sender] = msg.value;
		audits[contractAddress].noPoolFunders.push(msg.sender);

		emit AuditNoPoolUpdated(contractAddress, msg.sender, audits[contractAddress].totalNoPool);
	}

	function reportBug(address contractAddress) external payable {
		Bug memory newBug;
		newBug.createdTime = block.timestamp;
		newBug.verdict = 0;
		newBug.status = 0;

		if (audits[contractAddress].reporterToBugs[msg.sender].length == 0) {
			audits[contractAddress].bugReporters.push(msg.sender);
		}
		audits[contractAddress].reporterToBugs[msg.sender].push(newBug);

		emit NewBugReported(contractAddress, msg.sender, block.timestamp);

		audits[contractAddress].totalYesPool += msg.value;
		audits[contractAddress].yesPool[msg.sender] += msg.value;
		audits[contractAddress].yesPoolFunders.push(msg.sender);

		emit AuditYesPoolUpdated(contractAddress, msg.sender, audits[contractAddress].totalYesPool);
	}

	function juryVote(
		address contractAddress,
		address bugReporter,
		uint16 bugIndex,
		uint8 juryIndex,
		bool vote
	) external {
		require(
			audits[contractAddress].jury[juryIndex] == msg.sender,
			"sender does not match given jury member"
		);
		require(
			!audits[contractAddress].reporterToBugs[bugReporter][bugIndex].juryMemberHasVoted[juryIndex],
			"jury member has voted"
		);

		audits[contractAddress].reporterToBugs[bugReporter][bugIndex].verdict += vote ? 1 : 0;
		audits[contractAddress].reporterToBugs[bugReporter][bugIndex].juryMemberHasVoted[
			juryIndex
		] = true;

		emit JuryVoteOnBug(
			contractAddress,
			bugReporter,
			audits[contractAddress].jury[juryIndex],
			bugIndex
		);

		uint8 totalVotes = 0;
		for (uint8 i = 0; i < 5; i++) {
			totalVotes += audits[contractAddress]
			.reporterToBugs[bugReporter][bugIndex].juryMemberHasVoted[i]
				? 1
				: 0;
		}

		bool verdict = audits[contractAddress].reporterToBugs[bugReporter][bugIndex].verdict >= 3;

		if (verdict || totalVotes == 5) {
			audits[contractAddress].reporterToBugs[bugReporter][bugIndex].status = verdict ? 2 : 1;
			juryVerdict(contractAddress, verdict);
		}
	}

	function juryVerdict(address contractAddress, bool verdict) internal {
		uint256 noPool = audits[contractAddress].totalNoPool;
		uint256 yesPool = audits[contractAddress].totalYesPool;
		uint256 totalPayout = noPool + yesPool;

		uint256 juryReward = (totalPayout * 5) / 100;

		if (verdict) {
			audits[contractAddress].totalYesPool += noPool;
			audits[contractAddress].totalNoPool = 0;

			// Paying out jury
			for (uint256 i = 0; i < audits[contractAddress].jury.length; i++) {
				payable(audits[contractAddress].jury[i]).transfer(juryReward / 5);
			}

			audits[contractAddress].totalYesPool = (audits[contractAddress].totalYesPool * 19) / 20;
			uint256 totalYesPoolValue = audits[contractAddress].totalYesPool;
			for (uint256 i = 0; i < audits[contractAddress].yesPoolFunders.length; i++) {
				address payable voter = payable(audits[contractAddress].yesPoolFunders[i]);
				voter.transfer((audits[contractAddress].yesPool[voter] * totalYesPoolValue) / yesPool);
				audits[contractAddress].totalYesPool -= ((audits[contractAddress].yesPool[voter] *
					totalYesPoolValue) / yesPool);
			}
		} else {
			if (audits[contractAddress].totalNoPool > 19 * (audits[contractAddress].totalYesPool)) {
				// totalNoPool has to be greater than 95% of sum of both pools for liquidation
				audits[contractAddress].totalNoPool += yesPool;
				audits[contractAddress].totalYesPool = 0;

				// Paying out jury
				for (uint256 i = 0; i < audits[contractAddress].jury.length; i++) {
					payable(audits[contractAddress].jury[i]).transfer(juryReward / 5);
				}

				audits[contractAddress].totalNoPool = (audits[contractAddress].totalNoPool * 19) / 20;
				uint256 totalNoPoolValue = audits[contractAddress].totalNoPool;
				for (uint256 i = 0; i < audits[contractAddress].noPoolFunders.length; i++) {
					address payable voter = payable(audits[contractAddress].noPoolFunders[i]);
					voter.transfer((audits[contractAddress].noPool[voter] * totalNoPoolValue) / noPool);
					audits[contractAddress].totalNoPool -= ((audits[contractAddress].yesPool[voter] *
						totalNoPoolValue) / noPool);
				}
			}
		}

		emit AuditCompleted(audits[contractAddress].creator, contractAddress, block.timestamp, verdict);
	}

	function addEligibleJuryMember(address memberAddress) external {
		eligibleJuryMembers.push(memberAddress);

		emit JuryMemberAdded(memberAddress, block.timestamp);
	}

	function getContractsToBeStreamed() public view returns (address[] memory) {
		address[] memory toStream = new address[](contractsAudited.length);

		for (uint256 i = 0; i < contractsAudited.length; i++) {
			if (audits[contractsAudited[i]].lastStreamTime - block.timestamp > interval) {
				toStream[i] = contractsAudited[i];
			}
		}

		return toStream;
	}

	function streamPools(address[] memory needStreaming) internal {
		for (uint256 i = 0; i < needStreaming.length; i++) {
			if (needStreaming[i] == address(0)) {
				continue;
			}
			if ((block.timestamp - audits[needStreaming[i]].lastStreamTime) / (1 days) < 1) {
				continue;
			}
			if ((block.timestamp - audits[needStreaming[i]].createdTime) / (1 days) >= 30) {
				juryVerdict(needStreaming[i], false);
			}
			uint256 totalYesPoolValue = audits[needStreaming[i]].totalYesPool;
			uint256 daysRemaining = (block.timestamp - audits[needStreaming[i]].createdTime) / (1 days);
			audits[needStreaming[i]].totalYesPool -= totalYesPoolValue / daysRemaining;
			audits[needStreaming[i]].totalNoPool += totalYesPoolValue / daysRemaining;
			audits[needStreaming[i]].lastStreamTime = block.timestamp;
		}
	}

	function checkUpkeep(
		bytes calldata /* checkData */ // checkData is unused
	) external view override returns (bool upkeepNeeded, bytes memory performData) {
		address[] memory needStreaming = getContractsToBeStreamed();
		upkeepNeeded = needStreaming.length > 0;
		performData = abi.encode(needStreaming);
		return (upkeepNeeded, performData);
	}

	function performUpkeep(bytes calldata performData) external override {
		address[] memory needStreaming = abi.decode(performData, (address[]));
		streamPools(needStreaming);
	}

	function getAuditData(address contractAddress)
		external
		view
		returns (
			address creator,
			address[5] memory jury,
			uint256 createdTime,
			uint256 totalYesPool,
			uint256 totalNoPool
		)
	{
		return (
			audits[contractAddress].creator,
			audits[contractAddress].jury,
			audits[contractAddress].createdTime,
			audits[contractAddress].totalYesPool,
			audits[contractAddress].totalNoPool
		);
	}

	function getNumberOfBugsByReporter(address contractAddress, address reporter)
		external
		view
		returns (uint256)
	{
		return audits[contractAddress].reporterToBugs[reporter].length;
	}

	function getBugByIndex(
		address contractAddress,
		address reporter,
		uint256 index
	)
		external
		view
		returns (
			uint256,
			bool[5] memory,
			uint256,
			uint8
		)
	{
		return (
			audits[contractAddress].reporterToBugs[reporter][index].createdTime,
			audits[contractAddress].reporterToBugs[reporter][index].juryMemberHasVoted,
			audits[contractAddress].reporterToBugs[reporter][index].verdict,
			audits[contractAddress].reporterToBugs[reporter][index].status
		);
	}

	function getEligibleJuryMembers() external view returns (address[] memory) {
		return eligibleJuryMembers;
	}

	function getAuditsUserIsOnJuryOf(address userAddress) external view returns (address[] memory) {
		return juryMemberToAudits[userAddress];
	}
}
