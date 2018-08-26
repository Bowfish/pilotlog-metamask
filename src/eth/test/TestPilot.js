var LogFactory = artifacts.require("LogFactory");
var Pilot      = artifacts.require("Pilot");
var Logbook    = artifacts.require("Logbook");
var Document   = artifacts.require("Document");

// the contract instances we will need later

var pilotContract;
var pilotContractAddress;
var pilotContractOwner;
var logbookContractAddress;
var logbookContractOwner;
var documentContractAddress;
var documentContractOwner;

// I like to declare the vals we will use in the tests up front
var firstName     = 'firstName';
var lastName      = 'lastName';
var email         = 'email';
var birthDate     = new Date().getTime();
var logbookEntry  = '0x7b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d';
var documentEntry = '0xac087acb603f0e6be6ec1aa7234a830924afd81cdf30c4d42a88f54b01abbfcf';
var ipfsDocHash = 'QmV2E1QsAe1peoLoWom8aGhz4dFv44Xv4LypPh91w3vJKk'
var ipfsDoc = {
	digest: '0x63496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb',
	hashFunction: 18,
	size: 32
}
var log = {
	modified: 1,
	date:	'14.08.2018',
	from:	'LSZC',
	to:	'LSZC',
	blkOff:	'05:40',
	tOff:	'05:45',
	ldg:	'06:45',
	blkOn:	'06:50',
	type:	'RF6',
	callsign:	'HB-NBE',
	ldgDay:	'1',
	ldgNight:	'0',
	fltTime:	'01:00',
	blkTime:	'01:10',
	remarks:	'Training Flight'
}

var owner;

contract("Pilot basic test patterns", function(accounts) {

  owner = accounts[0];

  it('create Pilot, Logbook and Document contracts', async function() {

    pilotContract = await Pilot.new()
		pilotContractAddress = pilotContract.address
    pilotContractOwner = await pilotContract.owner.call()

    logbookContractAddress = await pilotContract.getLogbookContract()
    logbookContract = await Logbook.at(logbookContractAddress)
    logbookContractOwner = await logbookContract.owner.call()

    documentContractAddress = await pilotContract.getDocumentContract()
    documentContract = await Logbook.at(documentContractAddress)
    documentContractOwner = await documentContract.owner.call()

    assert.strictEqual(pilotContractAddress, logbookContractOwner, "Logbook contract addresses do not match!");
    assert.strictEqual(pilotContractAddress, documentContractOwner, "Document contract addresses do not match!");
	})

  it("create pilot data and get it back.", async function() {

    await pilotContract.setPilotData(
      web3.utils.utf8ToHex(firstName),
      web3.utils.utf8ToHex(lastName),
      web3.utils.utf8ToHex(email),
			birthDate,
      {from: owner}
		)
    const pilotData = await pilotContract.getPilotData({from: owner});
    assert.strictEqual(web3.utils.hexToUtf8(pilotData[0]), firstName, "First Name is not correct.");
    assert.strictEqual(web3.utils.hexToUtf8(pilotData[1]), lastName,  "Last Name is not correct.");
    assert.strictEqual(web3.utils.hexToUtf8(pilotData[2]), email,     "Email is not correct.");
    assert.strictEqual(pilotData[3].toNumber(), birthDate, "Birth Date is not correct.");

  })

  it("create a logbook entry and get it back.", async function() {
    await pilotContract.setIpfsLogbook(
      1,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
    )
    const documentEntry = await pilotContract.getIpfsLogbook(
      1,
      {from: owner}
    )
    assert.strictEqual(documentEntry[0], ipfsDoc.digest, "Logbook Entry is not correct.");
  })

  it("delete a logbook entry and get it back.", async function() {
    await pilotContract.deleteIpfsLogbook(
      1,
      {from: owner}
    )
    const documentEntry = await pilotContract.getIpfsLogbook(
      1,
      {from: owner}
    )
    assert.strictEqual(documentEntry[1].toNumber(), 0, "Logbook Entry is not correct.");
  })

  it("create a document entry and get it back.", async function() {
    await pilotContract.setIpfsDocument(
      1,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
    )
    const documentEntry = await pilotContract.getIpfsDocument(
      1,
      {from: owner}
    )
    assert.strictEqual(documentEntry[0], ipfsDoc.digest, "Document Entry is not correct.");
  })

  it("delete a document entry and get it back.", async function() {
    await pilotContract.deleteIpfsDocument(
      1,
      {from: owner}
    )
    const documentEntry = await pilotContract.getIpfsDocument(
      1,
      {from: owner}
    )
    assert.strictEqual(documentEntry[1].toNumber(), 0, "Document Entry is not correct.");
  })

  it("delete the Logbook Contract", async function() {
    await pilotContract.deleteLogbookContract(
      {from: owner}
    )
  })

  it("delete the Dcouments Contract", async function() {
    await pilotContract.deleteDocumentContract(
      {from: owner}
    )
  })

})
