/*
LogFactory.deployed().then(function(instance){log=instance})
log.createPilot({from: '0xa35c6eb16d0061feb92b1e4979e94e2f99630d6a'});
log,deleteLogbookEntry('0x7b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d')
*/

pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import 'openzeppelin-solidity/contracts/lifecycle/Destructible.sol';

import './Pilot.sol';

/**
 * @title LogFactory
 * @author Damian Hischier
 * @dev Base contract that handels all interaction between the front end and the contracts
 */
contract LogFactory is Destructible {

  mapping(address => address) public pilotContracts;

  event LogSetPilotData(
    address indexed pilotId,
    bytes32 firstName,
    bytes32 lastName,
    bytes32 email,
    int birthDate
  );

  event LogAddLogbookEntry(
    address indexed pilotId,
    string indexed logbookEntryIpfsHash,
    string logbookData
  );

  event LogSetIpfsDocument(
    address indexed pilotId,
    uint indexed docType,
    bytes32 _digest,
    uint8 _hashFunction,
    uint8 _size
  );

  event LogSetIpfsLogbook(
    address indexed pilotId,
    uint indexed docType,
    bytes32 _digest,
    uint8 _hashFunction,
    uint8 _size
  );

  event LogCreatePilotContract ( address indexed pilotId, address pilotContract );
  event LogSetPilotContract    ( address indexed pilotId, address pilotContract );
  event LogDeleteIpfsDocument  ( address indexed pilotId, uint indexed docType );
  event LogDeleteIpfsLogbook   ( address indexed pilotId, uint indexed docType );

  /**
   * @dev Only a registered pilot is allowed to execute functions with this modifyer
   */
  modifier onlyPilot() {
    require(pilotContracts[msg.sender] != 0);
    _;
  }

  /**
   * @dev Checks whether the pilot exists or not
   * @param _pilotId The ccount address of the pilot
   * @return pilotExists The true if the pilot exists, false if not
   */
  function isPilot(
    address _pilotId
  ) public view onlyOwner returns(bool pilotExists) {
    if (pilotContracts[_pilotId] == 0) return false;
    else return true;
  }

  /**
   * @dev Create a new Pilot contract
   * @param _pilotId The ccount address of the pilot
   */
  function createPilotContract(
    address _pilotId
  ) public onlyOwner {
    if (!isPilot(_pilotId)) {
      pilotContracts[_pilotId] = new Pilot();
      emit LogCreatePilotContract(_pilotId, pilotContracts[_pilotId]);
    }
  }

  /**
   * @dev Return the address of the Pilot contract of the current pilot
   * @param _pilotId The ccount address of the pilot
   * @return pilotContract The address of the Pilot contract of the current pilot
   */
  function getPilotContract(
    address _pilotId
  ) public view onlyOwner returns(address pilotContract) {
    if (isPilot(_pilotId)) return(pilotContracts[_pilotId]);
  }


  /**
   * @dev Delete the Pilot contract and its child contracts Logbook and Dcouments
   */
  function deletePilotContract(
    address _pilotId
  ) public onlyOwner {
    if (isPilot(_pilotId)) {
      Pilot(pilotContracts[_pilotId]).deleteLogbookContract();
      Pilot(pilotContracts[_pilotId]).deleteDocumentContract();
      Pilot(pilotContracts[_pilotId]).destroy();
    }
  }

  /**
   * @dev Set a new Pilot contract in case the Pilot Contract needs to be changed
   * @param _pilotId The ccount address of the pilot
   * @param _pilotContract The address of new Pilot contract
   */
  function setPilotContract(
    address _pilotId,
    address _pilotContract
  ) public onlyOwner {
    pilotContracts[_pilotId] = _pilotContract;
    emit LogSetPilotContract(_pilotId, pilotContracts[_pilotId]);
  }

  /**
   * @dev Return the address of the Pilot->Logbook contract of the current pilot
   * @param _pilotId The ccount address of the pilot
   * @return logbookContract The address of the Pilot->Logbook contract
   */
  function getLogbookContract(
    address _pilotId
  ) public view onlyOwner returns (address logbookContract) {
    if (isPilot(_pilotId)) return (Pilot(pilotContracts[_pilotId]).getLogbookContract());
  }

  /**
   * @dev Return the address of the Pilot->Document contract of the current pilot
   * @param _pilotId The ccount address of the pilot
   * @return documentContract The address of the Pilot->Document contract
   */
  function getDocumentContract(
    address _pilotId
  ) public view onlyOwner returns (address documentContract) {
    if (isPilot(_pilotId)) return (Pilot(pilotContracts[_pilotId]).getDocumentContract());
  }

  /**
   * @dev Set the data of the pilot
   * @param _firstName The first name of the pilot
   * @param _lastName the last name of the pilot
   * @param _email the email address of the pilot
   * @param _birthDate the birth date of the pilot
   */
  function setPilotData(
    bytes32 _firstName,
    bytes32 _lastName,
    bytes32 _email,
    int _birthDate
  ) public onlyPilot {
    require(pilotContracts[msg.sender] != 0);
    Pilot(pilotContracts[msg.sender]).setPilotData(
      _firstName,
      _lastName,
      _email,
      _birthDate
    );
    emit LogSetPilotData(
      msg.sender,
      _firstName,
      _lastName,
      _email,
      _birthDate
    );
  }

  /**
   * @dev Return the data of the pilot
   * @return firstName The first name of the current pilot
   * @return lastName The last name of the current pilot
   * @return email The email address of the current pilot
   * @return birthDate The birth date of the current pilot
   */
  function getPilotData() public view onlyPilot returns ( bytes32 firstName, bytes32 lastName, bytes32 email, int birthDate) {
    require(pilotContracts[msg.sender] != 0);
    return (
      Pilot(pilotContracts[msg.sender]).getPilotData()
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
  ) public onlyPilot {
    require(_docType > 0 && _docType < 255);
    require(_hashFunction > 0 && _hashFunction < 255);
    require(_size > 0 && _size < 255);
    require(pilotContracts[msg.sender] != 0);
    Pilot(pilotContracts[msg.sender]).setIpfsDocument(
      _docType,
      _digest,
      _hashFunction,
      _size
    );
    emit LogSetIpfsDocument(
      msg.sender,
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
  ) public view onlyPilot returns (bytes32 digest, uint8 hashFunction, uint8 size) {
    require(_docType > 0 && _docType < 255);
    require(pilotContracts[msg.sender] != 0);require(pilotContracts[msg.sender] != 0);
    return(
      Pilot(pilotContracts[msg.sender]).getIpfsDocument(_docType)
    );
  }

  /**
   * @dev Delete a IPFS Document in out case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   */
  function deleteIpfsDocument(
    uint8 _docType
  ) public onlyPilot {
    require(_docType > 0 && _docType < 255);
    require(pilotContracts[msg.sender] != 0);
    Pilot(pilotContracts[msg.sender]).deleteIpfsDocument(_docType);
    emit LogDeleteIpfsDocument(
      msg.sender,
      _docType
    );
  }

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
  ) public onlyPilot {
    require(_docType > 0 && _docType < 255);
    require(_hashFunction > 0 && _hashFunction < 255);
    require(_size > 0 && _size < 255);
    require(pilotContracts[msg.sender] != 0);
    Pilot(pilotContracts[msg.sender]).setIpfsLogbook(
      _docType,
      _digest,
      _hashFunction,
      _size
    );
    emit LogSetIpfsLogbook(
      msg.sender,
      _docType,
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
  ) public view onlyPilot returns (bytes32 digest, uint8 hashFunction, uint8 size) {
    require(_docType > 0 && _docType < 255);
    require(pilotContracts[msg.sender] != 0);require(pilotContracts[msg.sender] != 0);
    return(
      Pilot(pilotContracts[msg.sender]).getIpfsLogbook(_docType)
    );
  }

  /**
   * @dev Delete a IPFS Logbook in out case a license
   * @param _docType The typ of the document (1 = license, other numbers can be added later)
   */
  function deleteIpfsLogbook(
    uint8 _docType
  ) public onlyPilot {
    require(_docType > 0 && _docType < 255);
    require(pilotContracts[msg.sender] != 0);
    Pilot(pilotContracts[msg.sender]).deleteIpfsLogbook(_docType);
    emit LogDeleteIpfsLogbook(
      msg.sender,
      _docType
    );
  }

}
