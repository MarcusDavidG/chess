// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract QuantumChessArena is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
    using Strings for uint256;

    struct Game {
        address player1;
        address player2;
        string[] moves;
        uint256 startTime;
        uint8 status; // 0: waiting, 1: active, 2: finished
        address winner;
    }

    struct PlayerStats {
        uint256 rating;
        uint256 gamesPlayed;
        uint256 gamesWon;
    }

    mapping(uint256 => Game) public games;
    mapping(address => PlayerStats) public playerStats;
    uint256 public gameCounter;
    uint256 public achievementCounter;

    event MoveMade(uint256 indexed gameId, address indexed player, string move, uint256 timestamp);
    event GameCreated(uint256 indexed gameId, address indexed player1, address indexed player2);
    event GameEnded(uint256 indexed gameId, address indexed winner);
    event AchievementMinted(uint256 indexed tokenId, address indexed player, string achievementType);

    constructor() ERC721("Quantum Chess Achievements", "QCA") {}

    function createGame(address opponent) public returns (uint256 gameId) {
        gameId = ++gameCounter;
        games[gameId] = Game({
            player1: msg.sender,
            player2: opponent,
            moves: new string[](0),
            startTime: block.timestamp,
            status: 1,
            winner: address(0)
        });

        playerStats[msg.sender].gamesPlayed++;
        if (opponent != address(0)) {
            playerStats[opponent].gamesPlayed++;
        }

        emit GameCreated(gameId, msg.sender, opponent);
    }

    function makeMove(uint256 gameId, string memory move) public {
        Game storage game = games[gameId];
        require(game.status == 1, "Game not active");
        require(msg.sender == game.player1 || msg.sender == game.player2, "Not a player in this game");

        game.moves.push(move);
        emit MoveMade(gameId, msg.sender, move, block.timestamp);
    }

    function endGame(uint256 gameId, address winner) public {
        Game storage game = games[gameId];
        require(game.status == 1, "Game not active");
        require(msg.sender == game.player1 || msg.sender == game.player2 || msg.sender == owner(), "Not authorized");

        game.status = 2;
        game.winner = winner;

        if (winner != address(0)) {
            playerStats[winner].gamesWon++;
            updateRating(winner, true);
        }

        emit GameEnded(gameId, winner);
    }

    function getGameState(uint256 gameId) public view returns (Game memory) {
        return games[gameId];
    }

    function getActiveGames() public view returns (uint256[] memory) {
        uint256[] memory activeGames = new uint256[](gameCounter);
        uint256 count = 0;
        for (uint256 i = 1; i <= gameCounter; i++) {
            if (games[i].status == 1) {
                activeGames[count] = i;
                count++;
            }
        }
        // Resize array to actual count
        assembly {
            mstore(activeGames, count)
        }
        return activeGames;
    }

    function updateRating(address player, bool won) internal {
        PlayerStats storage stats = playerStats[player];
        if (stats.rating == 0) {
            stats.rating = 1200; // Default rating
        }

        uint256 k = 32; // K-factor
        uint256 expectedScore = 1 / (1 + 10 ** ((stats.rating - 1200) / 400));
        uint256 actualScore = won ? 1 : 0;
        int256 ratingChange = int256(k) * (int256(actualScore) - int256(expectedScore));

        stats.rating = uint256(int256(stats.rating) + ratingChange);
    }

    function mintAchievement(address player, string memory achievementType) public onlyOwner {
        achievementCounter++;
        _mint(player, achievementCounter);
        _setTokenURI(achievementCounter, string(abi.encodePacked("ipfs://", achievementType)));
        emit AchievementMinted(achievementCounter, player, achievementType);
    }

    // Override functions
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
