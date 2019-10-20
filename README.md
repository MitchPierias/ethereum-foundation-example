# Ethereum Variable Bounty Contract Example
Handles bounty escrow between supporters and participants for completion of a specified task.

- No middle men.
- No hidden fees or expenses.

## Usage
Starting a local blockchain instance with webpack-dev-server is as simple as executing `./run.sh`. Alternatively, if you'd like to manually start your blockchain and environment, you can follow the steps below.

Install all required dependencies;
```
npm install
```
Start a blockchain instance with Ganashe-CLI with our testing mneumonic;
```
npm install ganache-cli
ganache-cli -m clerk orchard ill believe nuclear insane double roof doll butter clump state
```

Test truffle is setup to run and deploy a local environment. You can configure these settings in `truffle-config.js`.
```
npm install truffle-cli -g
truffle test --network development
```

Compile and Migrate the contracts onto the blockchain
```
truffle migrate
```

Start the local environment with `webpack-dev-server`:
```
npm start
```

Before you run the local environment, make sure you have Metamask installed in your browser of choice and configured to Localhost
![](https://media.giphy.com/media/5dUIadUrTi6NYQya7B/giphy.gif | width=100)

## How it works

### Backing Period
The contract becomes open to supporters looking to back the cause with Ethereum.

### Submission Period
The submission period opens the contract up too bounty submissions
Anyone with an Ethereum wallet can create a submission. Each submission requires a twitter post ID for the verification in the moderation stage. Submissions are approved once 3 moderators have verified the tweet, then all parties are paid their portion.

### Reward Period
Submissions close, moderation remains open and participants can claim their awarded portion for approved submission.

#### Moderators
Moderators are any entity which has had their submission approved. In other words, the submisison approval acts as a KYC verification stage, but we've made it community driven and incentivised our moderators as such.

#### Incentives
Participants can reveice badges like power donator or power contributor for contributing past certain thresholds.

## Notes
- You will need to add safemath libraries.
- Doens't do any GAS maths...
- Number of approvals should be fixed and preferably small to liit GAS usage. It should be possible to calculate gas to iterate a fixed size array.
- Incorporate a standardized token contract to handle token allocation, probably ERC20.
- Add date checking... seeing as this event occurs on a specific date, be sure to check submission are within the approved range? Also incorporate tools to help moderators verify the tweet date as well. Use a modifier in the contract.
- Build and host front-end on IPFS.
