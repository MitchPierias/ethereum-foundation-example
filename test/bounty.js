const Bounty = artifacts.require('Bounty');
const TWEET_ID = 12345;
// Period dates
const TODAYS_DATE = (new Date()).getTime()/1000;
const FUNDING_DATE = parseInt(TODAYS_DATE);
const SUBMISSION_DATE = parseInt(TODAYS_DATE+36000);
const REWARD_DATE = parseInt(TODAYS_DATE+760000);

contract("Bounty", function(accounts) {
    
    let contract;

    context("Initializing", () => {
        
        it("Initializes with date periods", () => {
            // Deploy a new contract instance with date periods
            return Bounty.new(FUNDING_DATE, SUBMISSION_DATE, REWARD_DATE).then(instance => {
                contract = instance;
            }).then(() => contract.fundingDate()).then(date => {
                assert.equal(date.toNumber(), FUNDING_DATE, "Funding date doesn't match");
            }).then(() => contract.submissionDate()).then(date => {
                assert.equal(date.toNumber(), SUBMISSION_DATE, "Submission date doesn't match");
            }).then(() => contract.rewardDate()).then(date => {
                assert.equal(date.toNumber(), REWARD_DATE, "Reward date doesn't match");
            });
        });
        // We need to allow admin approvals for initial moderators
        // This could possibly be limited to fit the decentralized model
        it("Owner approves moderators", () => {
            return contract.approveModerator(accounts[accounts.length-1]).then(function({ receipt }) {
                assert.isTrue(receipt.status);
            }).then(() => contract.approveModerator(accounts[accounts.length-2])).then(function({ receipt }) {
                assert.isTrue(receipt.status);
            }).then(() => contract.approveModerator(accounts[accounts.length-3])).then(function({ receipt }) {
                assert.isTrue(receipt.status);
            });
        });
    });

    context("Supporter Funding", () => {
        // Contributions
        const CONTRIBUTION_VALUE = 5;

        it("Contribute bounty funds", () => {
            return contract.contribute({value:CONTRIBUTION_VALUE}).then(({ receipt }) => {
                assert.isTrue(receipt.status);
            }).then(() => contract.getContributions()).then(value => {
                assert.equal(value, CONTRIBUTION_VALUE, `Members contributions should equal ${CONTRIBUTION_VALUE}`);
            }).then(() => contract.getBalance().then(balance => {
                assert.equal(balance, CONTRIBUTION_VALUE, `Total balance should equal ${CONTRIBUTION_VALUE}`);
            }));
        });

        it("Within funding period");
    });

    context("Submission Publication", () => {

        it("Publishes a submission", function() {
            return contract.publishSubmission(TWEET_ID).then(({ receipt }) => {
                assert.isTrue(receipt.status, "Failed to publish submission");
            }).then(() => contract.getSubmission(TWEET_ID)).then(approvals => {
                assert.equal(approvals.toNumber(), 0, "Submission shouldn't have approvals");
            }).then(() => contract.getRandomSubmission()).then(randomSubmissionID => {
                assert.equal(randomSubmissionID.toNumber(), TWEET_ID, "Random submission should match submitted tweet");
            });
        });

        it("Within submission period");
    });

    context("Submisison Moderation", () => {

        it("Returns a random submission", function() {
            return contract.getRandomSubmission().then(tweetID => {
                assert.equal(tweetID.toNumber(), TWEET_ID, "Random tweet doesn't match stored");
            }).then(() => contract.publishSubmission(56789).then(({ receipt }) => {
                assert.isTrue(receipt.status, "Failed to publish second tweet");
            }).then(() => contract.publishSubmission(101112).then(({ receipt }) => {
                assert.isTrue(receipt.status, "Failed to publish second tweet");
            }).then(() => contract.getRandomSubmission().then(tweetID => {
                assert.include([TWEET_ID,56789,101112], tweetID.toNumber(), "Random tweet outside stored values");
            }))));
        });

        it("Moderators validate a submission", function() {
            // Consecutively approve a submission until it's passed validation
            return contract.approveSubmission(TWEET_ID, {from:accounts[accounts.length-1]}).then(({ receipt }) => {
                assert.isTrue(receipt.status, "First approval failed");
            }).then(() => contract.totalShares()).then(totalTokens => {
                assert.equal(totalTokens.toNumber(), 0, "Contract shouldn't have allocated shares");
            }).then(() => contract.getSubmission(TWEET_ID)).then(state => {
                assert.equal(state.toNumber(), 1, "Submission should have an approval");
            }).then(() => contract.approveSubmission(TWEET_ID, {from:accounts[accounts.length-2]}).then(({ receipt }) => {
                assert.isTrue(receipt.status, "Second approval failed");
            }).then(() => contract.getSubmission(TWEET_ID)).then(state => {
                assert.equal(state.toNumber(), 2, "Submission should have two approvals");
            }).then(() => contract.approveSubmission(TWEET_ID, {from:accounts[accounts.length-3]}).then(({ receipt }) => {
                assert.isTrue(receipt.status, "Third approval failed");
            }).then(() => contract.getSubmission(TWEET_ID)).then(state => {
                assert.equal(state.toNumber(), 3, "Submission should now have three approvals");
            }).then(() => contract.totalShares()).then(totalTokens => {
                assert.equal(totalTokens.toNumber(), 13, "Contract should have allocated 13 shares");
            })));
        });

        it("Rewards submission publisher", () => {
            return contract.getTokens().then(tokens => {
                assert.equal(tokens, 10, "Submission publisher should hold 10 shares");
            }).then(() => contract.totalShares()).then(totalTokens => {
                assert.equal(totalTokens.toNumber(), 13, "Contract should have allocated 13 shares");
            });
        });

        it("Rewards submission moderators", () => {
            return contract.getTokens({from:accounts[accounts.length-1]}).then(tokens => {
                assert.equal(tokens, 1, "Moderator 1 should hold 1 share");
            }).then(() => contract.getTokens({from:accounts[accounts.length-2]}).then(tokens => {
                assert.equal(tokens, 1, "Moderator 2 should hold 1 share");
            }).then(() => contract.getTokens({from:accounts[accounts.length-3]}).then(tokens => {
                assert.equal(tokens, 1, "Moderator 3 should hold 1 share");
            }).then(() => contract.totalShares()).then(totalTokens => {
                assert.equal(totalTokens.toNumber(), 13, "Contract should have allocated 13 shares");
            })));
        });

        it("Removes validated submission from queue");
    });

    context("Reward Claims", () => {

        it("Rewarded tokens correctly", () => {
            return contract.getTokens().then(tokens => {
                assert.equal(tokens, 10, "Submission publisher should hold 10 shares");
            }).then(() => contract.totalShares()).then(totalTokens => {
                assert.equal(totalTokens.toNumber(), 13, "Contract should have allocated 13 shares");
            }).then(() => contract.getTokens({from:accounts[accounts.length-1]}).then(tokens => {
                assert.equal(tokens, 1, "Moderator 1 should hold 1 share");
            }).then(() => contract.getTokens({from:accounts[accounts.length-2]}).then(tokens => {
                assert.equal(tokens, 1, "Moderator 2 should hold 1 share");
            }).then(() => contract.getTokens({from:accounts[accounts.length-3]}).then(tokens => {
                assert.equal(tokens, 1, "Moderator 3 should hold 1 share");
            }).then(() => contract.totalShares()).then(totalTokens => {
                assert.equal(totalTokens.toNumber(), 13, "Contract should have allocated 13 shares");
            }))));
        });

        it("Allowed withdrawal of bounty reward", () => {
            let withdrawalAmount = 8, memberTokens = 0;
            return contract.getTokens().then(tokens => {
                memberTokens = tokens;
            }).then(() => contract.claimReward(withdrawalAmount).then(({ receipt }) => {
                assert.isTrue(receipt.status, "Claim failed");
                memberTokens -= withdrawalAmount;
            }).then(() => contract.getTokens()).then(tokens => {
                assert.equal(tokens, memberTokens, "Tokens incorrect after withdrawal");
            }));
        });

        it("Prevents invalid withdrawals");
    })
})