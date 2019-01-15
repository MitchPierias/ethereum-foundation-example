pragma solidity ^0.5.0;

/**
  * @title Randomisation Library
  */
library Random {

    /** 
     * @notice Random number is insecure
     * @dev Generates a random value within the given range.
     * @param maximumValue The maximum value of values.
     * @return uint8 Random number.
     */
    function generate(uint256 maximumValue) public view returns (uint8) {
        return uint8(uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp))) % maximumValue);
    }
} 