# Pilot Log

## Author
Damian Hischier

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Test](#test)
- [Usage](#usage)

## Overview
A pilot log based on the ethereum blockchain.

The pilot can log his flights. The logbook data are stored on ipfs.

The pilot can upload his license. The license will be uploaded to ipfs.

## Installation
Install all npm modules:

`$ npm install --save`

Install truffle version 5.0.0

`$ sudo npm install -g truffle@next`

Install ganache:

`$ sudo npm install -g ganache-cli`

## Test
Run the truffle tests:

`$ ganache-cli`

Change to another terminal

`$ cd src/eth`

`$ truffle test`

For each of the contracts a series of tests will be exceuted.

### Tests for Logbook and Document Contracts
* Create a new contract and check that the account which deployed it is the owner.
* Create a new IPFS document and get it back. This will test the Multihash library.
* Create a second IPFS document and get it back. This will test the Multihash library.
* Delete the first IPFS document. This will test the delete function.
* Delete the second IPFS document. This will test the delete function.
* Destroy the contract

### Tests for Pilot Contract
* Create a new contract and check that the account which deployed it is the owner and that the Pilot contract is the owner of Logbook and Document contracts.
* Create pilot data and get it back.
* Create a logbook entry and get it back.
* Delete a logbook entry.
* Create a document entry and get it back.
* Delete a document entry.
* Delete the Logbook contract.

### Test for LogFactory Contract
* Create a LogFactory contract with its child Pilot and its children Logbook and Document and check that the LogFactory contract is the owner of the Pilot contract and the Pilot contract is the owner of the Logbook and Document contracts.
* Create pilot data and get it back.
* Create a logbook entry and get it back.
* Delete a logbook entry.
* Create a document entry and get it back.
* Delete a document entry.
* Delete the Pilot contract and its children.

## Usage
Depoly the contracts:

`$ cd src/eth`

`$ truffle migrate --reset`

`$ cd ../..`

`$ npm start`

Now you can access the app on http://localhost:3000/

### Pilot Data
Click on Pilot Data. You can enter the first name, last name, email address and birth date of the pilot. Click on Save. When you click Save you have to sign the transaction with Metamask. The data will be stored in the Pilot contract.

### Logbook
Click on Logbook. You can enter logbook data in the input fields. When you leave the Remarks field, the data will be stored in the state. If you want to store the data on the blockchain, click on Save. When you click Save you have to sign the transaction with Metamask. If the transaction is signed the data will be uploaded to IPFS.

### License
Click on License. Select the file which you want to upload and click Upload Licese. When you clicked Upload you have to sign the transaction with Metamsk. Be careful what kind of file you want to upload. The file you will upload, will remain on ipfs permanently. You will not be able to delete it. The selected file will be uploaded to IPFS. Click on License to download the file. If you want to delete the license click on Delete License. The file will not be deleted, but the hash which is stored in the contract will be deleted.

## Metamsk
Note on Metamask: If you get the following error message while signing a transaction with Metamask:

Error: the tx doesn't have the correct nonce. account has nonce of: 20 tx has nonce of: 46

Follow [this](https://consensys.zendesk.com/hc/en-us/articles/360004177531-Resetting-an-Account-New-UI-) procedure.
