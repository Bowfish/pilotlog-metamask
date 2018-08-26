pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/lifecycle/Destructible.sol';

// library
import './Multihash.sol';

/**
 * @title Logbook
 * @author Damian Hischier
 * @dev Logbook contract that manages the data of the logbook entries
 */
contract Logbook is Destructible {

  mapping(uint8 => Multihash.Data) private ipfsLogbooks;

  /**
   * @dev Set a new IPFS Logbook in our case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   * @param _digest The digest part of the multiHash derived form the IPFS hash
   * @param _hashFunction The hashFunction part of the multiHash derived form the IPFS hash
   * @param _size The size part of the multiHash derived form the IPFS hash
   */
  function setIpfsLogbook(
    uint8 _docType,
    bytes32 _digest,
    uint8 _hashFunction,
    uint8 _size
  ) public {
    require(_docType > 0 && _docType < 255);
    require(_hashFunction > 0 && _hashFunction < 255);
    require(_size > 0 && _size < 255);
    Multihash.set(
      ipfsLogbooks[_docType],
      _digest,
      _hashFunction,
      _size
    );
  }

  /**
   * @dev Get a IPFS Logbook in our case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   * @return digest The digest part of the multiHash derived form the IPFS hash
   * @return hashFunction The hashFunction part of the multiHash derived form the IPFS hash
   * @return size The size part of the multiHash derived form the IPFS hash
   */
  function getIpfsLogbook(
    uint8 _docType
  ) public view returns(bytes32 digest, uint8 hashFunction, uint8 size) {
    require(_docType > 0 && _docType < 255);
    return (
      Multihash.getDigest(ipfsLogbooks[_docType]),
      Multihash.getHashFunction(ipfsLogbooks[_docType]),
      Multihash.getSize(ipfsLogbooks[_docType])
    );
  }

  /**
   * @dev Delete a IPFS Logbook in our case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   */
  function deleteIpfsLogbook(
    uint8 _docType
  ) public onlyOwner {
    require(_docType > 0 && _docType < 255);
    require(ipfsLogbooks[_docType].digest != 0);
    delete ipfsLogbooks[_docType];
  }

}
