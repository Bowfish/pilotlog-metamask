pragma solidity 0.4.24;

/**
 * @title Multihash library
 * @dev Store and manage the multiHash for IPFS documents
 */
library Multihash {

  struct Data {
    bytes32 digest;
    uint8 hashFunction;
    uint8 size;
  }

  /**
   * @dev Set the multiHash data
   * @param self The Data struct of the multiHash
   * @param _digest The digest part of the multiHash
   * @param _hashFunction The hashFunction part of the multiHash
   * @param _size The size part of the multiHash
   */
  function set(Data storage self, bytes32 _digest, uint8 _hashFunction, uint8 _size)
    public
  {
    require(_hashFunction > 0 && _hashFunction < 255);
    require(_size > 0 && _size < 255);
    self.digest = _digest;
    self.hashFunction = _hashFunction;
    self.size = _size;
  }

  /**
   * @dev Return the digest part of the multiHash
   * @param self The Data struct of the multiHash
   * @return digest The digest part of the multiHash
   */
  function getDigest(Data storage self) view public returns(bytes32 digest) {
    return (self.digest);
  }

  /**
   * @dev Return the hashFunction part of the multiHash
   * @param self The Data struct of the multiHash
   * @return hashFunction The hashFunction part of the multiHash
   */
  function getHashFunction(Data storage self) view public returns(uint8 hashFunction) {
    return (self.hashFunction);
  }

  /**
   * @dev Return the size part of the multiHash
   * @param self The Data struct of the multiHash
   * @return size The size part of the multiHash
   */
  function getSize(Data storage self) view public returns(uint8 size) {
    return (self.size);
  }

}
