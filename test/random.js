const Random = artifacts.require('Random');

contract("Random", () => {

    it("Returns a random number", () => {
        let contract;
        return Random.deployed().then(instance => {
            contract = instance;
        }).then(() => contract.generate(1)).then(index => {
            assert.equal(index.toNumber(), 0, "Should be a zero index");
        }).then(() => contract.generate(3)).then(index => {
            assert.isBelow(index.toNumber(), 3, "Index should be less than 3");
            assert.isAtLeast(index.toNumber(), 0, "Index should be 0 or greater");
        });
    });
})