# Plant a Tree Day
> No safemaths or token standards have been implemented.
> You're going to want it.

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
This contract eliminates intermediaries
#### Submissions
Anyone with an Ethereum wallet can create a submission. Each submission requires a twitter post ID for the verification in the moderation stage. Submissions are approved once 3 moderators have verified the tweet, then all parties are paid their portion.

#### Moderators
Moderators are any entity which has had their submission approved. In other words, the submisison approval acts as a KYC verification stage, but we've made it community driven and incentivised our moderators as such.

#### Funding (Investors)
Investors are the third element which provide a value to the tokens allocated. Token holders can 'sell' their tokens back to the investors to recevie their reward and essentially create in interal micro economy. Actually I don't know why investors would now want an essentaill useless token, but ehh... crypto! You could possibly make moderator approval be strengethed by ownership, or higher rewards for more tokens held. This would increase locked tokens and therefor effect supply & demand, inflating token value.

## Notes
- You will need to add safemath libraries.
- Doens't do any GAS maths...
- Number of approvals should be fixed and preferably small to liit GAS usage. It should be possible to calculate gas to iterate a fixed size array.
- Incorporate a standardized token contract to handle token allocation, probably ERC20.
- Add date checking... seeing as this event occurs on a specific date, be sure to check submission are within the approved range? Also incorporate tools to help moderators verify the tweet date as well. Use a modifier in the contract.
- Build and host front-end on IPFS.