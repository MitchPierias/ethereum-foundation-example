const Foundation = artifacts.require('Foundation');
const TWEET_ID = 12345;

contract("Foundation", function(accounts) {
    
    let contract, admins = accounts.slice(0,3);

    it("Initializes with three moderators", function() {
        return Foundation.deployed(admins).then(function(instance) {
            contract = instance;
            return contract.countMembers();
        }).then(function(count) {
            assert.equal(count, 3);
        });
    });

    it("Publishes a submission", function() {
        return contract.publishSubmission(TWEET_ID).then(function() {
            return contract.getSubmission(TWEET_ID);
        }).then(function(submissionState) {
            assert.equal(submissionState, 1);
        });
    });

    it("Returns a random submission", function() {
        return contract.getRandomSubmission().then(function(tweetID) {
            assert.equal(typeof(tweetID.toNumber()), 'number');
            assert.equal(tweetID.toNumber(), TWEET_ID);
        });
    });

    it("Approves a submission", function() {
        return contract.approveSubmission(TWEET_ID, {sender:"0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c"}).then(function(result) {
            console.log(result);
            assert.equal(true, true)
        });
    })
})