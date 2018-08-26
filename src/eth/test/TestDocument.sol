pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Multihash.sol";
import "../contracts/Document.sol";

contract TestDocument {

  Multihash.Data ipfsDoc_1 = Multihash.Data(
    0x63496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb,
  	18,
  	32
  );

  Multihash.Data ipfsDoc_2 = Multihash.Data(
    0x13496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb,
  	18,
  	32
  );

  Document documents = new Document();

  function testSetFirstIpfsDocument() public {

    documents.setIpfsDocument(
      1,
      ipfsDoc_1.digest,
      ipfsDoc_1.hashFunction,
      ipfsDoc_1.size
		);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsDocument(1);

    Assert.equal(documentsEntry.digest, ipfsDoc_1.digest, "Document digest is not correct");
    Assert.equal(uint(documentsEntry.hashFunction), uint(ipfsDoc_1.hashFunction), "Document hashFunction is not correct");
    Assert.equal(uint(documentsEntry.size), uint(ipfsDoc_1.size), "Document size is not correct");

  }

  function testSetSecondIpfsDocument() public {

    documents.setIpfsDocument(
      2,
      ipfsDoc_2.digest,
      ipfsDoc_2.hashFunction,
      ipfsDoc_2.size
		);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsDocument(2);

    Assert.equal(documentsEntry.digest, ipfsDoc_2.digest, "Document digest is not correct");
    Assert.equal(uint(documentsEntry.hashFunction), uint(ipfsDoc_2.hashFunction), "Document hashFunction is not correct");
    Assert.equal(uint(documentsEntry.size), uint(ipfsDoc_2.size), "Document size is not correct");

  }

  function testFirstDeleteDocument() public {

    documents.deleteIpfsDocument(1);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsDocument(1);

    Assert.equal(uint(documentsEntry.hashFunction), uint(0), "Could not delete the document");

  }

  function testSecondDeleteDocument() public {

    documents.deleteIpfsDocument(2);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsDocument(2);

    Assert.equal(uint(documentsEntry.hashFunction), uint(0), "Could not delete the document");

  }

  function testDestroy() public {
    documents.destroy();
    Assert.equal(true, true, "Contract could not be destroyed");
  }

}
