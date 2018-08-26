const Multihash = artifacts.require("Multihash");
const Document = artifacts.require("Document");
let documents;

const documentsEntryHash_1  = '0x7b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d';
const documentsEntryHash_2  = '0x1b73022f4a97c5efad3ee9c46b58c11e7a401f249b37b742f67f1a2096ef887d';

var ipfsDoc = {
	digest: '0x63496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb',
	hashFunction: 18,
	size: 32
}

contract("Document basic test patterns", function(accounts) {

  const owner = accounts[0];

  it('create a Document contract and check that account[0] is the owner', async function() {

    documents = await Document.new()
    const documentsOwner = await documents.owner.call()
    assert.strictEqual(documentsOwner, owner, "Document owner is not correct!");
	})

  it('create a new IPFS document and get it back', async function() {
    await documents.setIpfsDocument(
      1,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsDocument(
      1,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.digest, ipfsDoc.digest, "Document digest is not correct");
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), ipfsDoc.hashFunction, "Document hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), ipfsDoc.size, "Document size is not correct");
	})

  it('create a second IPFS document and get it back', async function() {
    await documents.setIpfsDocument(
      2,
      ipfsDoc.digest,
      ipfsDoc.hashFunction,
      ipfsDoc.size,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsDocument(
      2,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.digest, ipfsDoc.digest, "Document digest is not correct");
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), ipfsDoc.hashFunction, "Document hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), ipfsDoc.size, "Document size is not correct");
	})

  it('delete the first IPFS document', async function() {
    await documents.deleteIpfsDocument(
      1,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsDocument(
      1,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), 0, "Document hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), 0, "Document size is not correct");
	})

  it('delete the second IPFS document', async function() {
    await documents.deleteIpfsDocument(
      2,
      {from: owner}
		)
    const documentsEntry = await documents.getIpfsDocument(
      2,
      {from: owner}
    )
    // documentEntry.hashFunction is a BN
    // documentEntry.size is a BN
    assert.strictEqual(documentsEntry.hashFunction.toNumber(), 0, "Document hashFunction is not correct");
    assert.strictEqual(documentsEntry.size.toNumber(), 0, "Document size is not correct");
	})

  it('finally destroy the contract', async function() {
    await documents.destroy(
      {from: owner}
		)
    assert.strictEqual(true, true, "Unable to destroy the contract");
	})

});
