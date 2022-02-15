// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721{
  using Counters for Counters.Counter;

  // Constants

  Counters.Counter private currentTokenId;
  mapping (uint256 => string) private _tokenURIs;
  mapping (address => string) private collections;

  /// @dev Base token URI used as a prefix by tokenURI().
  string public baseTokenURI;

  constructor() ERC721("Existence", "IDs") {
   setBaseTokenURI("https://ipfs.io/ipfs/");
  }

  function mintTo(address recipient, string memory metadataURI) public payable returns (uint256) {
    uint256 tokenId = currentTokenId.current();
    currentTokenId.increment();
    uint256 newItemId = currentTokenId.current();
    _safeMint(recipient, newItemId);
    _setTokenURI(newItemId, metadataURI);
    string memory currentcollection = collections[msg.sender];
    string memory spacer = ",";

    collections[msg.sender] = append(currentcollection,spacer, Strings.toString(newItemId));
    return newItemId;
  }

  /// @dev Returns an URI for a given token ID
  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  /// @dev Sets the base token URI prefix.
  function setBaseTokenURI(string memory _baseTokenURI) public {
    baseTokenURI = _baseTokenURI;
  }



function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
            require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
            _tokenURIs[tokenId] = _tokenURI;
        }

         function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
            require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

            string memory _tokenURI = _tokenURIs[tokenId];
            string memory base = _baseURI();
            
         
                return string(abi.encodePacked(base, _tokenURI));
          
        }

function append(string memory a, string memory b, string memory c) internal pure returns (string memory) {

    return string(abi.encodePacked(a, b, c));

}


function getCurrentTokenId() public view returns (uint256 tokenid) {
  return currentTokenId.current();
}

function getCollection() public view returns (string memory collection) {
  return collections[msg.sender];
}

function getTokenUrl(uint256 tokenid) public view returns(string memory url) {
  return _tokenURIs[tokenid];
}
}

