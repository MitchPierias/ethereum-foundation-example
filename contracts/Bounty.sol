pragma solidity ^0.5.0;

import "./Random.sol";
import 'openzeppelin-solidity/contracts/math/SafeMath.sol';

contract Bounty {

    using SafeMath for uint256;
    /// Moderators are any entity which has had a submission approved
    /// Approving or denying a submission awards moderator with a micro payment
    struct Moderator {
        uint256[]    approvals; // This will get heavy on storage
        bool        approved;
        uint256      tokens;
    }

    struct Member {
        uint256     contributions;
        bool        isModerator;
    }
    
    struct Tweet {
        address publisher;
        uint256 tweetID;
        address[] approvals; // Max at 3
        SubmissionState state;
    }

    address public owner = msg.sender;
    uint256 public fundingDate = now;
    uint256 public submissionDate = now;
    uint256 public rewardDate = now;

    uint8 private paymentPortionPublish = 99;
    uint8 private paymentPortionModerate = 1;
    
    uint256 public totalShares = 0;

    uint256 public totalRaised = 0;

    uint256 public totalApprovals = 0;
    
    uint256[] private queue; // This will get heavy on storage
    
    mapping(uint256 => Tweet) private submissions;
    
    mapping(address => Moderator) private members;

    mapping(address => Member) private contributers;

    enum SubmissionState { Denied, Submitted, Reviewed, Granted }
    SubmissionState constant DEFAULT_STATE = SubmissionState.Submitted;

    // Emitted when a new submission is stored
    event DidPublishSubmission(address publisher, uint256 tweetID);
    // Emitted when submission successfully approved
    event DidApproveSubmission(uint256 tweetID);
    // Emitted when tokens are claimes
    event DidClaimTokens(address claimant, uint256 amount, uint256 value);

    /**
     * When Owner
     * @dev Passes only teh contract owner
     */
    modifier whenOwner() {
        require(msg.sender == owner, "Requires owner permissions");
        _;
    }

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
    modifier whenUnique(uint256 tweetID) {
        //require(submissions[tweetID], "Tweet already stored."); // Weird this isn't passing compilation checks
        _;
    }

    /**
     * When Funding Period
     * @dev Passes only when the current time is within the funding and reward time range.
     */
    modifier whenFundingPeriod() {
        require(fundingDate <= now && now < rewardDate, "Funding isn't open");
        _;
    }

    /**
     * When Submission Period
     * @dev Passes only when the current time is within the submission and reward time range.
     */
    modifier whenSubmissionPeriod() {
        //require(submissionDate <= now && now < rewardDate, "Submissions aren't open");
        _;
    }

    modifier whenRewardPeriod() {
        //require(now >= rewardDate, "Rewards aren't open");
        _;
    }

    // Constructor
    // Requires array of three unique admins
    // ["0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c","0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db"]
    constructor(uint256 _fundingDate, uint256 _submissionDate, uint256 _rewardDate) public {
        fundingDate = _fundingDate;
        submissionDate = _submissionDate;
        rewardDate = _rewardDate;
    }

    function contribute() public payable whenFundingPeriod {
        // Validate deposit value
        require(msg.value > 0, "Invalid funds");
        // Update raised count
        totalRaised = totalRaised.add(msg.value);
        // Save contributor
        Member memory entity = contributers[msg.sender];
        entity.contributions = entity.contributions.add(msg.value);
        contributers[msg.sender] = entity;
    }

    function getContributions() public view returns (uint256 value) {
        return contributers[msg.sender].contributions;
    }

    function getBalance() public view returns (uint256 total) {
        return address(this).balance;
    }

    /**
     * Get Tokens
     * @dev Get's the total number of tokens for the member
     * @return tokens - Sender's total tokens
     */
    function getTokens() public view returns (uint256) {
        return members[msg.sender].tokens;
    }

    function claimReward(uint256 _claimAmount) public payable whenRewardPeriod {
        // Validate amount
        require(_claimAmount > 0 && _claimAmount <= members[msg.sender].tokens, "Invalid or insufficent funds");
        // Update members shares
        Moderator storage member = members[msg.sender];
        member.tokens = member.tokens.sub(_claimAmount);
        // Calculate the token value as a share of the total pool
        uint256 tokenValue = totalRaised.mul(_claimAmount.div(totalShares));
        // Transfer value and notify
        address(msg.sender).transfer(tokenValue);
        emit DidClaimTokens(msg.sender, _claimAmount, tokenValue);
    }

    function approveModerator(address _memberAddress) public whenOwner {
        // Pass to private function
        Moderator memory member = members[_memberAddress];
        member.approved = true;
        members[_memberAddress] = member;
    }

    /**
     * Publish Submission
     * @dev Stores the `tweetID` for a unique submission
     * @param tweetID - Submission reference ID
     */
    function publishSubmission(uint256 tweetID) whenSubmissionPeriod public whenUnique(tweetID) payable {
        // Validate Tweet ID
        require(tweetID > 0, "Invalid Tweet ID");
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
     * @param tweetID - Submission reference ID
     * @return approvals - Current submission approval count
     */
    function getSubmission(uint256 tweetID) public view returns (uint256 approvals) {
        // Get the total submission approvals
        return submissions[tweetID].approvals.length;
    }

    function getRandomSubmission() public view returns (uint256) {
        // Should randomly generate a number between zero and unsubmitted total
        uint256 randomIndex = Random.generate(queue.length);
        // Return the ID of the unapproved for the twitter display
        return queue[randomIndex];
    }

    /**
     * Approve Submission
     * @dev Submits an approval on the specified submission
     * @param tweetID - Submission reference ID
     */
    function approveSubmission(uint256 tweetID) whenModerator(msg.sender) public payable {
        // Get current tweet
        Tweet storage submission = submissions[tweetID];
        // Ensure no self approval
        require(submission.publisher != msg.sender, "Can't approve your own tweet");
        // Ensure unique approval
        for (uint256 i = 0; i < submission.approvals.length; i++) {
            require(submission.approvals[i] != msg.sender, "Already approved");
        }
        // Update Submission and moderators cache
        submission.approvals.push(msg.sender);
        members[msg.sender].approvals.push(tweetID);
        // Process submission approval
        if (!shouldApprove(tweetID)) return;
        validateSubmission(tweetID);
    }

    /**
     * Is Approved
     * @dev Validates the specified submission has three approvals
     */
    function shouldApprove(uint256 tweetID) public view returns (bool) {
        // Checks if a submission has three approvals
        return submissions[tweetID].approvals.length >= 3;
    }

    /**
     * Validate Submission
     * @dev Reallocates token ownership to invloved parties
     */
    function validateSubmission(uint256 tweetID) private {
        // get submission
        Tweet storage submission = submissions[tweetID];
        submission.state = SubmissionState.Granted;
        // Update approval count
        totalApprovals = totalApprovals.add(1);
        // Deduct from token pool (Check if safe first, change to inflationary model, create tokens)
        totalShares = totalShares.add(13);
        // Approve publisher as a moderator
        Moderator storage publisher = members[submission.publisher];
        publisher.approved = true;
        publisher.tokens = publisher.tokens.add(10); // Allocates the tokens to the submission entrant
        // Pays dividends for moderation
        for (uint8 i = 0; i<submission.approvals.length; i++) {
            members[submission.approvals[i]].tokens = members[submission.approvals[i]].tokens.add(1);
        }
        // Notify approval
        emit DidApproveSubmission(submission.tweetID);
    }
}