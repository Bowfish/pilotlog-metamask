const Multihash  = artifacts.require("Multihash");
const LogFactory = artifacts.require("LogFactory");
const Pilot      = artifacts.require("Pilot");
const Logbook    = artifacts.require("Logbook");
const Document   = artifacts.require("Document");

/*
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
*/

module.exports = function (deployer, network, accounts) {

  deployer.then(async () => {

    await deployer.deploy(Multihash)
    await deployer.link(Multihash, LogFactory)
    await deployer.deploy(LogFactory)

		// Deployments for truffel test
    await deployer.link(Multihash, Document)
    await deployer.link(Multihash, Logbook)
    await deployer.link(Multihash, Pilot)
    await deployer.deploy(Document)
    await deployer.deploy(Pilot)
    await deployer.deploy(Logbook)

    //const logFactoryContract = await LogFactory.deployed()

		/*
    const isPilot = await logFactoryContract.isPilot(accounts[0], {from: accounts[0]})
		console.log('isPilot: ' + isPilot)
		*/

		/*
    console.log('   ************************************************************************');
    console.log('   * Creating a Pilot including child contracts for each account')
    console.log('   ************************************************************************');
    await logFactoryContract.createPilotContract(accounts[0], {from: accounts[0]})
    console.log('')
    const isPilot = await logFactoryContract.isPilot(accounts[0], {from: accounts[0]})
		console.log('isPilot: ' + isPilot)

    const pilotContractAddress = await logFactoryContract.getPilotContract(accounts[0], {from: accounts[0]})
    const pilotContract = await Pilot.at(pilotContractAddress)
    const pilotContractOwner = await pilotContract.owner.call()

    const logbookContractAddress = await pilotContract.getLogbookContract()
    const logbookContract = await Logbook.at(logbookContractAddress)
    const logbookContractOwner = await logbookContract.owner.call()

    const documentContractAddress = await pilotContract.getDocumentContract()
    const documentContract = await Logbook.at(documentContractAddress)
    const documentContractOwner = await documentContract.owner.call()

    console.log('   ************************************************************************');
    console.log('   * Checking all contract ownerships for account[0]')
    console.log('   ************************************************************************');
    console.log('   * LogFactory                : ' + logFactoryContract.address)
    console.log('   * Pilot Contract Owner      : ' + pilotContractOwner)
    console.log('   * Pilot Contract Address    : ' + pilotContractAddress)
    console.log('   * Logbook Contract Owner    : ' + logbookContractOwner)
    console.log('   * Logbook Contract Address  : ' + logbookContractAddress)
    console.log('   * Document Contract Owner   : ' + documentContractOwner)
    console.log('   * Document Contract Address : ' + documentContractAddress)
    console.log('   ************************************************************************');
    console.log('')
		*/

		/*
    await logFactoryContract.setPilotData(
      web3.utils.utf8ToHex('Damian'),
      web3.utils.utf8ToHex('Hischier'),
      web3.utils.utf8ToHex('dh@xmx.ch'),
      new Date(1990, 04, 20, 06, 15).getTime(),
      {from: accounts[0]}
    )

    const pilotData = await logFactoryContract.getPilotData( {from: accounts[0]} )
		console.log(pilotData)

    console.log('************************************************************************');
    console.log('* Creating Pilot data for   : ' + accounts[0])
    console.log('************************************************************************');
    console.log('* First Name: ' + web3.utils.hexToUtf8(pilotData.firstName))
    console.log('* Last Name : ' + web3.utils.hexToUtf8(pilotData.lastName))
    console.log('* Email     : ' + web3.utils.hexToUtf8(pilotData.email))
    console.log('* Birth Date: ' + pilotData.birthDate.toNumber())
    console.log('************************************************************************');
    console.log('')

    await logFactoryContract.setIpfsLogbook(
      2,
      ipfsLog.digest,
      ipfsLog.hashFunction,
      ipfsLog.size,
      {from: accounts[0]}
    )

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
		*/

  })
}
