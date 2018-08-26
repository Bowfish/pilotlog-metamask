pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/lifecycle/Destructible.sol';

// library
import './Multihash.sol';

/**
 * @title ocuments
 * @author Damian Hischier
 * @dev Logbook contract that manages the data of the logbook entries
 */
contract Document is Destructible {

  mapping(uint8 => Multihash.Data) private ipfsDocuments;

  /**
   * @dev Set a new IPFS Document in our case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   * @param _digest The digest part of the multiHash derived form the IPFS hash
   * @param _hashFunction The hashFunction part of the multiHash derived form the IPFS hash
   * @param _size The size part of the multiHash derived form the IPFS hash
   */
  function setIpfsDocument(
    uint8 _docType,
    bytes32 _digest,
    uint8 _hashFunction,
    uint8 _size
  ) public {
    // check for overflows
    require(_docType > 0 && _docType < 255);
    require(_hashFunction > 0 && _hashFunction < 255);
    require(_size > 0 && _size < 255);
    Multihash.set(
      ipfsDocuments[_docType],
      _digest,
      _hashFunction,
      _size
    );
  }

  /**
   * @dev Get a IPFS Document in our case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   * @return digest The digest part of the multiHash derived form the IPFS hash
   * @return hashFunction The hashFunction part of the multiHash derived form the IPFS hash
   * @return size The size part of the multiHash derived form the IPFS hash
   */
  function getIpfsDocument(
    uint8 _docType
  ) public view returns(bytes32 digest, uint8 hashFunction, uint8 size) {
    require(_docType > 0 && _docType < 255);
    return (
      Multihash.getDigest(ipfsDocuments[_docType]),
      Multihash.getHashFunction(ipfsDocuments[_docType]),
      Multihash.getSize(ipfsDocuments[_docType])
    );
  }

  /**
   * @dev Delete a IPFS Document in our case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   */
  function deleteIpfsDocument(
    uint8 _docType
  ) public onlyOwner {
    require(_docType > 0 && _docType < 255);
    require(ipfsDocuments[_docType].digest != 0);
    delete ipfsDocuments[_docType];
  }

}
