# Ethereum Variable Bounty Contract Example
A sample variable bounty contract on the Ethereum blockchain.

## Idea
Receives money from supporters and distributes to participants. A pure charity with no middle man, no hidden fees or expenses.

## Setup
Install all dependencies
```
npm install
```
Start a blockchain instance with Ganashe-CLI or Geth with mneumonic
```
npm install ganache-cli
ganache-cli -m clerk orchard ill believe nuclear insane double roof doll butter clump state
```

Test truffle is setup to run and deploy a local environment. You can configure these settings in `truffle-config.js`.
```
npm install truffle-cli -g
truffle test --network development
```

Deploy or Migrate the contracts onto the blockchain
```
truffle migrate
```

Start the webpack-dev-server
```
npm start
```

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

## Notes
- You will need to add safemath libraries.
- Doens't do any GAS maths...
- Number of approvals should be fixed and preferably small to liit GAS usage. It should be possible to calculate gas to iterate a fixed size array.
- Incorporate a standardized token contract to handle token allocation, probably ERC20.
- Add date checking... seeing as this event occurs on a specific date, be sure to check submission are within the approved range? Also incorporate tools to help moderators verify the tweet date as well. Use a modifier in the contract.
- Build and host front-end on IPFS.