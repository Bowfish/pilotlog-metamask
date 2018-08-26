/*
const Multihash  = artifacts.require("Multihash.sol");
const LogFactory = artifacts.require("LogFactory.sol");
const Pilot      = artifacts.require("Pilot.sol");
const Logbook    = artifacts.require("Logbook.sol");
const Document  = artifacts.require("Document.sol");
*/
const Multihash  = artifacts.require("Multihash");
const LogFactory = artifacts.require("LogFactory");
const Pilot      = artifacts.require("Pilot");
const Logbook    = artifacts.require("Logbook");
const Document  = artifacts.require("Document");

var log = {
	modified: new Date().getTime(),
	date:	new Date().getTime(),
  dateStr: '2018.08-16',
	btStart:	new Date().getTime(),
	ftStart:	new Date().getTime(),
	ftEnd:	new Date().getTime(),
	btEnd:	new Date().getTime(),
	from:	'LSZC',
	to:	'LSZC',
	type:	'RF6',
	callsign:	'HB-NBE',
	ldgDay:	'1',
	ldgNight:	'0',
	remarks:	'Training Flight'
}

var ipfsHash = 'QmWmyoMoctfbAaiEs2G46gpeUmhqFRDW6KWo64y5r581Vz'
var ipfsDoc = {
	digest: '0x63496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb',
	hashFunction: 18,
	size: 32
}

var ipfsLogHash ='QmacbQA5VP7xBu1gRrGYyAjaZ6SN1HzFCLaXeKUkp9YzzA'
var ipfsLog = {
	digest: '0xb661cb4597e3f53caeec7d27df25d4da4f56472c882a4ab64994fb047ffa51ef',
	hashFunction: 18,
	size: 32
}

module.exports = function (deployer, network, accounts) {

  deployer.then(async () => {

    await deployer.deploy(Multihash)
    await deployer.link(Multihash, LogFactory)
    await deployer.link(Multihash, Document)
    await deployer.link(Multihash, Logbook)
    await deployer.link(Multihash, Pilot)
    await deployer.deploy(LogFactory)
    await deployer.deploy(Document)
    await deployer.deploy(Pilot)
    //await deployer.deploy(Logbook)
    const logFactoryContract = await LogFactory.deployed()

    // Create createPilotContract for each account
    console.log('************************************************************************');
    console.log('* Creating a Pilot including child contracts for each account')
    console.log('************************************************************************');
    accounts.forEach(async (account) => {
      console.log('* Creating a Contracts for:   ' + account)
      await logFactoryContract.createPilotContract(account, {from: accounts[0]})
    })
    console.log('************************************************************************');
    console.log('')

    const pilotContractAddress = await logFactoryContract.getPilotContract(accounts[0], {from: accounts[0]})
    const pilotContract = await Pilot.at(pilotContractAddress)
    //const pilotContractOwner = await pilotContract.getOwner()
    const pilotContractOwner = await pilotContract.owner.call()

    const logbookContractAddress = await pilotContract.getLogbookContract()
    const logbookContract = await Logbook.at(logbookContractAddress)
    //const logbookContractOwner = await logbookContract.getOwner()
    const logbookContractOwner = await logbookContract.owner.call()

    const documentContractAddress = await pilotContract.getDocumentContract()
    const documentContract = await Logbook.at(documentContractAddress)
    //const documentContractOwner = await documentContract.getOwner()
    const documentContractOwner = await documentContract.owner.call()

    console.log('************************************************************************');
    console.log('* Checking all contract ownerships for account[0]')
    console.log('************************************************************************');
    console.log('* LogFactory                : ' + logFactoryContract.address)
    console.log('* Pilot Contract Owner      : ' + pilotContractOwner)
    console.log('* Pilot Contract Address    : ' + pilotContractAddress)
    console.log('* Logbook Contract Owner    : ' + logbookContractOwner)
    console.log('* Logbook Contract Address  : ' + logbookContractAddress)
    console.log('* Document Contract Owner   : ' + documentContractOwner)
    console.log('* Document Contract Address : ' + documentContractAddress)
    console.log('************************************************************************');
    console.log('')

    await logFactoryContract.setPilotData(
      web3.utils.utf8ToHex('Damian'),
      web3.utils.utf8ToHex('Hischier'),
      web3.utils.utf8ToHex('dh@xmx.ch'),
      web3.utils.utf8ToHex('20.05.1970'),
      {from: accounts[0]}
    )

    const pilotData = await logFactoryContract.getPilotData( {from: accounts[0]} )

    console.log('************************************************************************');
    console.log('* Creating Pilot data for   : ' + accounts[0])
    console.log('************************************************************************');
    console.log('* First Name: ' + web3.utils.hexToUtf8(pilotData.firstName))
    console.log('* Last Name : ' + web3.utils.hexToUtf8(pilotData.lastName))
    console.log('* Email     : ' + web3.utils.hexToUtf8(pilotData.email))
    console.log('* Birth Date: ' + web3.utils.hexToUtf8(pilotData.birthDate))
    console.log('************************************************************************');
    console.log('')

		/*
    await logFactoryContract.addLogbookEntry(
      ipfsLogHash,
			'Data',
      ipfsLog.digest,
      ipfsLog.hashFunction,
      ipfsLog.size,
      {from: accounts[0]}
    )
		*/

    await logFactoryContract.setIpfsLogbook(
      2,
      ipfsLog.digest,
      ipfsLog.hashFunction,
      ipfsLog.size,
      {from: accounts[0]}
    )

		/*
    log.date = new Date(log.date).setDate(15)
    await logFactoryContract.addLogbookEntry(
      '0x7b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d',
      JSON.stringify(log),
      {from: accounts[0]}
    )

    log.date = new Date(log.date).setDate(16)
    await logFactoryContract.addLogbookEntry(
      '0x7c73cb6ce92315add94311ae3420cd84e92c1aaae7ce8972ab4924793ee953c4',
      JSON.stringify(log),
      {from: accounts[0]}
    )

    log.date = new Date(log.date).setDate(17)
    await logFactoryContract.addLogbookEntry(
      '0xac087acb603f0e6be6ec1aa7234a830924afd81cdf30c4d42a88f54b01abbfcf',
      JSON.stringify(log),
      {from: accounts[0]}
    )

    const logbookEntries = await logFactoryContract.getLogbookEntries(
      {from: accounts[0]}
    )

    console.log('************************************************************************');
    console.log('* Creaating Logbook data for: ' + accounts[0])
    console.log('************************************************************************');
    console.log('')
    console.log(logbookEntries);
    console.log('')
		*/


    await logFactoryContract.setIpfsDocument(
      1,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: accounts[0]}
    )

    const documentEntry = await logFactoryContract.getIpfsDocument(
      1,
      {from: accounts[0]}
    )

    console.log('************************************************************************');
    console.log('* Creaating License data for: ' + accounts[0])
    console.log('************************************************************************');
    console.log('hash: ' + documentEntry.digest);
    console.log('func: ' + documentEntry.hashFunction);
    console.log('size: ' + documentEntry.size);
    console.log('************************************************************************');
    console.log('')

    console.log('************************************************************************');
    console.log('* End of migrations')
    console.log('************************************************************************');
    console.log('')

  })
}
