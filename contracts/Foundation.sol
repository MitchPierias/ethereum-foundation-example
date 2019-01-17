pragma solidity ^0.5.0;

import "./Random.sol";

contract Foundation {
    /// Moderators are any entity which has had a submission approved
    /// Approving or denying a submission awards moderator with a micro payment
    struct Moderator {
        uint32[]    approvals; // This will get heavy on storage
        bool        approved;
        uint32      tokens;
    }
    
    struct Tweet {
        address publisher;
        uint32 tweetID;
        address[] approvals; // Max at 3
        SubmissionState state;
    }

    uint256 fundingDate;
    uint256 submissionDate;
    uint256 rewardDate;

    uint8 paymentPortionPublish = 99;
    uint8 paymentPortionModerate = 1;
    
    uint256 tokens = 1000000000;
    
    uint32[] queue; // This will get heavy on storage
    
    mapping(uint32 => Tweet) private submissions;
    
    mapping(address => Moderator) private members;

    enum SubmissionState { Denied, Submitted, Reviewed, Granted }
    SubmissionState constant DEFAULT_STATE = SubmissionState.Submitted;

    event DidPublishSubmission(address publisher, uint32 tweetID);

    event DidApproveSubmission(uint32 tweetID);

    /**
     * When Approved
     * @dev Passes only approved moderators
     * @param forAddress - Moderator's address
     */
    modifier whenModerator(address forAddress) {
        require(members[forAddress].approved, "Moderator not authorized.");
        _;
    }

    /**
     * When Unique
     * @dev Passes only unique Tweet IDs
     * @param tweetID - Tweet ID
     */
    modifier whenUnique(uint32 tweetID) {
        //require(submissions[tweetID], "Tweet already stored."); // Weird this isn't passing compilation checks
        _;
    }
    
    // Constructor
    // Requires array of three unique admins
    // ["0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db"]
    constructor(address[3] memory admins) public {
        
        for (uint8 i=0; i<admins.length; i++) {
            // Validate unique
            require(!members[admins[i]].approved, "Address in use");
            // Store new admin
            Moderator memory owner;
            owner.approved = true;
            owner.tokens = 0;
            members[admins[i]] = owner;
        }
    }

    function publishSubmission(uint32 tweetID) whenUnique(tweetID) public payable {
        // Queue tweet
        queue.push(tweetID);
        // Store new submission
        Tweet memory submission = submissions[tweetID];
        submission.publisher = msg.sender;
        submission.tweetID = tweetID;
        submission.state = DEFAULT_STATE;
        submissions[tweetID] = submission;
        // Notify publication
        emit DidPublishSubmission(msg.sender, tweetID);
    }
    
    /**
     * Get Submission
     * @dev Get's the current state of the specified submission
     * @param tweetID - Submision reference ID
     * @return state - Current submission state
     */
    function getSubmission(uint32 tweetID) public view returns (SubmissionState state) {
        // Get the submission state
        return submissions[tweetID].state;
    }
    
    function random(uint256 maximumValue) public view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp))) % maximumValue);
    }

    function getRandomSubmission() public view returns (uint32) {
        // Should randomly generate a number between zero and unsubmitted total
        uint8 randomIndex = random(queue.length);
        // Return the ID of the unapproved for the twitter display
        return queue[randomIndex];
    }

    function countMembers() public pure returns (uint256) {
        return 3;
    }

    /**
     * Total Tokens
     * @dev Get's the total number of tokens for the sender
     * @return tokens - Sender's total tokens
     */
    function totalTokens() public view returns (uint32) {
        // Get total tokens
        return members[msg.sender].tokens;
    }

    /**
     * Approve Submission
     * @dev Submits an approval on the specified submission
     * @param tweetID - Submision reference ID
     */
    function approveSubmission(uint32 tweetID) whenModerator(msg.sender) public payable {
        // Get current tweet
        Tweet storage submission = submissions[tweetID];
        // Ensure no self approval
        require(submission.publisher != msg.sender, "Can't approve your own tweet");
        // Ensure unique approval
        for (uint32 i = 0; i < submission.approvals.length; i++) {
            require(submission.approvals[i] != msg.sender, "Already approved");
        }
        // Update submision and moderators cache
        submission.approvals.push(msg.sender);
        members[msg.sender].approvals.push(tweetID);
        // Notify approval
        emit DidApproveSubmission(tweetID);
        // Perform payout
        if (isApproved(tweetID)) {
            rewardTokens(submission);
        }
    }

    /**
     * Is Approved
     * @dev Validates the specified submission has three approvals
     */
    function isApproved(uint32 tweetID) public view returns (bool) {
        // Checks if a submission has three approvals
        return submissions[tweetID].approvals.length >= 3;
    }

    /**
     * Reward Tokens
     * @dev Reallocates token ownership to invloved parties
     */
    function rewardTokens(Tweet memory submission) private {
        // Deduct from token pool (Check if safe first, change to inflationary model, create tokens)
        tokens = tokens - 13;
        // Approve publisher as a moderator
        Moderator memory entity = members[submission.publisher];
        entity.approved = true;
        entity.tokens += 10; // Allocates the tokens to the submission entrant
        members[submission.publisher] = entity;
        // Pays dividends for moderation
        for (uint8 i = 0; i<submission.approvals.length; i++) {
            members[submission.approvals[i]].tokens += 1;
        }
    }
}