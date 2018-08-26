pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Multihash.sol";
import "../contracts/Logbook.sol";

contract TestLogbook {

  Multihash.Data ipfsLog_1 = Multihash.Data(
    0x63496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb,
  	18,
  	32
  );

  Multihash.Data ipfsLog_2 = Multihash.Data(
    0x13496c77c534a7f894e93445e3128c76ea524596c7ba3b5eb86bd0d065907bcb,
  	18,
  	32
  );

  Logbook documents = new Logbook();

  function testSetFirstIpfsLogbook() public {

    documents.setIpfsLogbook(
      1,
      ipfsLog_1.digest,
      ipfsLog_1.hashFunction,
      ipfsLog_1.size
		);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsLogbook(1);

    Assert.equal(documentsEntry.digest, ipfsLog_1.digest, "Logbook digest is not correct");
    Assert.equal(uint(documentsEntry.hashFunction), uint(ipfsLog_1.hashFunction), "Logbook hashFunction is not correct");
    Assert.equal(uint(documentsEntry.size), uint(ipfsLog_1.size), "Logbook size is not correct");

  }

  function testSetSecondIpfsLogbook() public {

    documents.setIpfsLogbook(
      2,
      ipfsLog_2.digest,
      ipfsLog_2.hashFunction,
      ipfsLog_2.size
		);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsLogbook(2);

    Assert.equal(documentsEntry.digest, ipfsLog_2.digest, "Logbook digest is not correct");
    Assert.equal(uint(documentsEntry.hashFunction), uint(ipfsLog_2.hashFunction), "Logbook hashFunction is not correct");
    Assert.equal(uint(documentsEntry.size), uint(ipfsLog_2.size), "Logbook size is not correct");

  }

  function testFirstDeleteLogbook() public {

    documents.deleteIpfsLogbook(1);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsLogbook(1);

    Assert.equal(uint(documentsEntry.hashFunction), uint(0), "Could not delete the document");

  }

  function testSecondDeleteLogbook() public {

    documents.deleteIpfsLogbook(2);

    Multihash.Data memory documentsEntry;
    (documentsEntry.digest, documentsEntry.hashFunction, documentsEntry.size) = documents.getIpfsLogbook(2);

    Assert.equal(uint(documentsEntry.hashFunction), uint(0), "Could not delete the document");

  }

  function testDestroy() public {
    documents.destroy();
    Assert.equal(true, true, "Contract could not be destroyed");
  }

}
