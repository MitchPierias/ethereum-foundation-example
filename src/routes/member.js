import React, { Fragment } from 'react';
import { utils } from 'web3';
import { withChain } from '../utils/ChainContext';

class MemberElement extends React.Component {

    state = {
        tokens:0,
        total:0,
        amount:0,
        contribution:0
    }

    constructor() {
        super();
        // Bindings
        this.didChangeAmount = this.didChangeAmount.bind(this);
        this.didSubmitClaim = this.didSubmitClaim.bind(this);
        this.didChangeDonation = this.didChangeDonation.bind(this);
        this.didSubmitContribute = this.didSubmitContribute.bind(this);
    }

    componentWillMount() {
        this.props.drizzle.contracts.Bounty.methods["getTokens"]().call().then(tokens => this.setState({ tokens })).catch(console.log);
        this.props.drizzle.contracts.Bounty.methods["totalShares"]().call().then(total => this.setState({ total })).catch(console.log);
    }

    didChangeAmount(event) {
        const amount = event.target.value;
        this.setState({ amount });
    }

    didChangeDonation(event) {
        const contribution = event.target.value;
        this.setState({ contribution });
    }

    didSubmitClaim(event) {
        event.preventDefault();
        this.props.drizzle.contracts.Bounty.methods["claimReward"](this.state.amount).send().then(receipt => {
            console.log(receipt);
        }).catch(err => {
            console.log(err);
        });
    }

    didSubmitContribute(event) {
        event.preventDefault();
        const value = utils.toWei(this.state.contribution.toString(),'ether');
        this.props.drizzle.contracts.Bounty.methods["contribute"]().send({ value }).then(receipt => {
            console.log(receipt);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        const { tokens } = this.state;

        return (
            <Fragment>
                <div>You have</div>
                <div>{tokens} Tokens</div>
                <form onSubmit={this.didSubmitClaim}>
                    <input name="amount" type="number" defaultValue={tokens} min={0} max={tokens} step={1} onChange={this.didChangeAmount}/>
                    <button type="submit">Claim</button>
                </form>
                <form onSubmit={this.didSubmitContribute}>
                    <input name="amount" type="number" min={0} step={0.01} onChange={this.didChangeDonation}/>
                    <button type="submit">Contribute</button>
                </form>
            </Fragment>
        )
    }
}

export default withChain(MemberElement);