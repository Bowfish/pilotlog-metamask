const Multihash = artifacts.require("Multihash");
const Document = artifacts.require("Document");
var document;

const documentEntryHash_1  = '0x7b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d';
const documentEntryHash_2  = '0x1b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d';

var ipfsDoc = {
	digest: '0x63496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb',
	hashFunction: 18,
	size: 32
}

contract("Document basic test patterns", function(accounts) {

  const owner = accounts[0];

  it('create a Document contract and check that account[0] is the owner', async function() {

    document = await Document.new()
    const documentOwner = await document.owner.call()
    assert.strictEqual(documentOwner, owner, "Document owner is not correct!");
	})


  it('create a new IPFS document and get it back', async function() {
    await document.setIpfsDocument(
      1,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
		)
    const documentEntry = await document.getIpfsDocument(
      1,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentEntry.digest, ipfsDoc.digest, "Document digest is not correct");
    assert.strictEqual(documentEntry.hashFunction.toNumber(), ipfsDoc.hashFunction, "Document hashFunction is not correct");
    assert.strictEqual(documentEntry.size.toNumber(), ipfsDoc.size, "Document size is not correct");
	})

  it('create a second IPFS document and get it back', async function() {
    await document.setIpfsDocument(
      2,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
		)
    const documentEntry = await document.getIpfsDocument(
      2,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentEntry.digest, ipfsDoc.digest, "Document digest is not correct");
    assert.strictEqual(documentEntry.hashFunction.toNumber(), ipfsDoc.hashFunction, "Document hashFunction is not correct");
    assert.strictEqual(documentEntry.size.toNumber(), ipfsDoc.size, "Document size is not correct");
	})

  it('delete the first IPFS document', async function() {
    await document.deleteIpfsDocument(
      1,
      {from: owner}
		)
    const documentEntry = await document.getIpfsDocument(
      1,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentEntry.hashFunction.toNumber(), 0, "Document hashFunction is not correct");
    assert.strictEqual(documentEntry.size.toNumber(), 0, "Document size is not correct");
	})

  it('delete the second IPFS document', async function() {
    await document.deleteIpfsDocument(
      2,
      {from: owner}
		)
    const documentEntry = await document.getIpfsDocument(
      2,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentEntry.hashFunction.toNumber(), 0, "Document hashFunction is not correct");
    assert.strictEqual(documentEntry.size.toNumber(), 0, "Document size is not correct");
	})

  it('finally destroy the contract', async function() {
    await document.destroy(
      {from: owner}
		)
    assert.strictEqual(true, true, "Unable to destroy the contract");
	})

});
