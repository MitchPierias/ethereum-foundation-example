import ethService from './ethService';
import foundationABI from '../../build/contracts/Foundation.json';

export default new web3.eth.Contract(foundationABI,'0xF676d6B760D85542f6F64949823B2F41b28e4BBe', {
    from: '0x1234567890123456789012345678901234567891', // default from address
    gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
});