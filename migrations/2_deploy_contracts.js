const Random = artifacts.require("Random");
const Bounty = artifacts.require("Bounty");
const { utils } = require("web3");
// Period dates
const date = +new Date;
const fundingDate = Math.floor(date/1000);
const submissionDate = Math.floor(fundingDate+(86400*7));
const rewardDate = Math.floor(submissionDate+86400);
const INITIAL_FUNDS = utils.toWei('10','ether');

module.exports = async function(deployer) {
    // deployment steps
    deployer.deploy(Random);
    deployer.link(Random, Bounty);
    deployer.deploy(Bounty, fundingDate, submissionDate, rewardDate).then(instance => {
        // Approve moderators
        const moderators = [
            "0x756c4503d8ec96d2179cb832912c64f98aa265cc",
            "0x1b1ca9c3f38d1237d656958c310bc732d3d917ea",
            "0x2bfa0818a9e055149f6834d72706b58a47e193bb",
            "0x79a746322CD879D612c2826c9f71E4316a0f77ea",
            "0xbb8b4529447771e01defb3a201519b1aa3de2ad3",
            "0x9548131ef97d7acefa54b8c559f781a4f4b6be3f",
            "0xaacb98448498e1984363450a9e55602d8b335a77",
            "0xd8b283e397e3f7488c1699d7b9eb454f3350e9b4",
            "0x4d8424461b7b0bfdbbca46c2da469a374c5cf852",
            "0xc300eb19af80324f9558f2372d7f5f99391bd619"
        ];

        moderators.map(address => {
            return new Promise((resolve, reject) => {
                instance.approveModerator(address).then(function({ receipt }) {
                    if (receipt.status) {
                        resolve(address);
                        console.log(`Approved moderator ${address}`);
                    } else {
                        reject("Failed to approve "+address);
                    }
                }).catch(reject);
            });
        });

        Promise.all(moderators).then(status => {
            console.log(status);
        }).catch(err => {
            console.log("ERR", err);
        });

        instance.contribute({value:INITIAL_FUNDS}).then(({ receipt }) => {
            if (receipt.status) {
                console.log("Funded contract");
            } else {
                console.log("No funding")
            }
        }).catch(err => {
            console.log(err);
        });
    });
};