pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/lifecycle/Destructible.sol';

import './Logbook.sol';
import './Document.sol';

/**
 * @title Pilot
 * @author Damian Hischier
 * @dev Pilot contract which creates two child contracts (Logbook and Document)
 */
contract Pilot is Destructible {

  address private logbookContract;
  address private documentContract;

  struct PilotData {
    bytes32 firstName;
    bytes32 lastName;
    bytes32 email;
    int birthDate;
  }

  PilotData pilotData;

  /**
   * @dev Create a new Logbook contract
   * @dev Create a new Document contract
   */
  constructor() public {

    logbookContract = new Logbook();
    documentContract = new Document();
  }

  /**
   * @dev Return the address of the Logbook contract of the current pilot
   * @return logbookContractAddress The address of the Logbook contract of the current pilot
   */
  function getLogbookContract() public view returns(address logbookContractAddress) {
    return(logbookContract);
  }

  /**
   * @dev Destroy the Logbook contract
   */
  function deleteLogbookContract() public {
    Logbook(logbookContract).destroy();
  }

  /**
   * @dev Return the address of the Dcouments contract of the current pilot
   * @return documentContractAddress The address of the Document contract of the current pilot
   */
  function getDocumentContract() public view returns(address documentContractAddress) {
    return(documentContract);
  }

  /**
   * @dev Destroy the Document contract
   */
  function deleteDocumentContract() public {
    Document(documentContract).destroy();
  }

  /**
   * @dev Set the data of the pilot
   * @param _firstName The first name of the pilot
   * @param _lastName The last name of the pilot
   * @param _email the email address of the pilot
   * @param _birthDate The birth date of the pilot
   */
  function setPilotData(
    bytes32 _firstName,
    bytes32 _lastName,
    bytes32 _email,
    int _birthDate
  ) public onlyOwner {
    pilotData.firstName = _firstName;
    pilotData.lastName  = _lastName;
    pilotData.email     = _email;
    pilotData.birthDate = _birthDate;
  }

  /**
   * @dev Return the data of the pilot
   * @return firstName The first name of the current pilot
   * @return lastName The last name of the current pilot
   * @return email The email address of the current pilot
   * @return birthDate The birth date of the current pilot
   */
  function getPilotData() view public onlyOwner returns(bytes32 firstName, bytes32 lastName, bytes32 email, int birthDate) {
    return (
      pilotData.firstName,
      pilotData.lastName,
      pilotData.email,
      pilotData.birthDate
    );
  }

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
  ) public onlyOwner {
    require(_docType > 0 && _docType < 255);
    require(_hashFunction > 0 && _hashFunction < 255);
    require(_size > 0 && _size < 255);
    require(documentContract != 0);
    Document(documentContract).setIpfsDocument(
      _docType,
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
  ) public view onlyOwner returns (bytes32 digest, uint8 hashFunction, uint8 size) {
    require(_docType > 0 && _docType < 255);
    require(documentContract != 0);
    return (
      Document(documentContract).getIpfsDocument(_docType)
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
    require(documentContract != 0);
    Document(documentContract).deleteIpfsDocument(_docType);
  }

  /**
   * @dev Set a new IPFS Document in our case a license
   * @param _docType The typ of the logbook (1 = license, other numbers can be added later)
   * @param _digest The digest part of the multiHash derived form the IPFS hash
   * @param _hashFunction The hashFunction part of the multiHash derived form the IPFS hash
   * @param _size The size part of the multiHash derived form the IPFS hash
   */
  function setIpfsLogbook(
    uint8 _docType,
    bytes32 _digest,
    uint8 _hashFunction,
    uint8 _size
  ) public onlyOwner {
    require(_docType > 0 && _docType < 255);
    require(_hashFunction > 0 && _hashFunction < 255);
    require(_size > 0 && _size < 255);
    require(logbookContract != 0);
    Logbook(logbookContract).setIpfsLogbook(
      _docType,
      _digest,
      _hashFunction,
      _size
    );
  }

  /**
   * @dev Get a IPFS Logbook in our case a license
   * @param _docType The typ of the logbook (1 = license, other numbers can be added later)
   * @return digest The digest part of the multiHash derived form the IPFS hash
   * @return hashFunction The hashFunction part of the multiHash derived form the IPFS hash
   * @return size The size part of the multiHash derived form the IPFS hash
   */
  function getIpfsLogbook(
    uint8 _docType
  ) public view onlyOwner returns (bytes32 digest, uint8 hashFunction, uint8 size) {
    require(_docType > 0 && _docType < 255);
    require(logbookContract != 0);
    return (
      Logbook(logbookContract).getIpfsLogbook(_docType)
    );
  }

  /**
   * @dev Delete a IPFS Logbook in our case a license
   * @param _docType The typ of the logbook (1 = license, other numbers can be added later)
   */
  function deleteIpfsLogbook(
    uint8 _docType
  ) public onlyOwner {
    require(_docType > 0 && _docType < 255);
    require(logbookContract != 0);
    Logbook(logbookContract).deleteIpfsLogbook(_docType);
  }

}
