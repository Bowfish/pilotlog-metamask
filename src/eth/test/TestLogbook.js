const Multihash = artifacts.require("Multihash");
const Logbook = artifacts.require("Logbook");
let documents;

const documentsEntryHash_1  = '0x7b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d';
const documentsEntryHash_2  = '0x1b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d';

var ipfsDoc = {
	digest: '0x63496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb',
	hashFunction: 18,
	size: 32
}

contract("Logbook basic test patterns", function(accounts) {

  const owner = accounts[0];

  it('create a Logbook contract and check that account[0] is the owner', async function() {

    documents = await Logbook.new()
    const documentsOwner = await documents.owner.call()
    assert.strictEqual(documentsOwner, owner, "Logbook owner is not correct!");
	})

  it('create a new IPFS document and get it back', async function() {
    await documents.setIpfsLogbook(
      1,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsLogbook(
      1,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.digest, ipfsDoc.digest, "Logbook digest is not correct");
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), ipfsDoc.hashFunction, "Logbook hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), ipfsDoc.size, "Logbook size is not correct");
	})

  it('create a second IPFS document and get it back', async function() {
    await documents.setIpfsLogbook(
      2,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsLogbook(
      2,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.digest, ipfsDoc.digest, "Logbook digest is not correct");
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), ipfsDoc.hashFunction, "Logbook hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), ipfsDoc.size, "Logbook size is not correct");
	})

  it('delete the first IPFS document', async function() {
    await documents.deleteIpfsLogbook(
      1,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsLogbook(
      1,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), 0, "Logbook hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), 0, "Logbook size is not correct");
	})

  it('delete the second IPFS document', async function() {
    await documents.deleteIpfsLogbook(
      2,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsLogbook(
      2,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), 0, "Logbook hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), 0, "Logbook size is not correct");
	})

  it('finally destroy the contract', async function() {
    await documents.destroy(
      {from: owner}
		)
    assert.strictEqual(true, true, "Unable to destroy the contract");
	})

});
