# Pilot Log - Design Pattern Decisions

## Author
Damian Hischier

## Table of Contents
- [Project Structure](#project-structure)
- [Contracts](#contracts)
- [Libraries](#libraries)
- [IPFS](#ipfs)

## Project Structure
The project has the follwing contract structure:

### Contracts
* Logbook
  * Pilot
    * Logbook
    * Document

LogFactory: The LogFactory contract is the only contract which has functions which will be called by the dApp. Logbook forwards the function calls to Pilot which is a child of the Logbook contract. The account addresses of all pilots will be stored in Logbook. For each pilot a new Pilot contract will be created with its two child contracts Logbook and Document. Logbook holds the contract addresses of the Pilot contract. Pilot holds the addresses of Logbook and Document. In case a contract has to be changed or updated the contracts can be changed.

Pilot: The Pilot contracts stores the pilot datate and is the owner of the Logbook and Document contracts.

Logbook: The Logbook contract stores the IPFS hash of the logbook data.

Document: The Document contract stores the IPFS hash of the license file.

### Libraries
Multihash: This library manages the storage of the IPFS hashes.

Openzeppelin Destructible, Ownable: This Libraries are imported from openzeppelin and are used to manage the ownership of the contract and to stop the contract in case something goes wrong.

I choose this design pattern for the following reasons:

* Upgradability: In case one or more of the contracts have bugs or need to be upgraded they can be exchanged.
* Self Sovereign Identity: Each pilot has his own contracts and is therefore the owner of his data.

### IPFS
All user data are stored on IPFS. This guarantees that the whole application is fully decentralized.
