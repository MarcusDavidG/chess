# Quantum Chess Arena

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Real-time blockchain chess battles powered by Somnia Data Streams**

[Live Demo](https://quantum-chess-arena.vercel.app) • [Smart Contract](https://explorer.somnia.network/address/0x5f481427Dc681635dDEE38255da2E98FcaC90CeE) • [Documentation](#documentation)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Smart Contracts](#smart-contracts)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Quantum Chess Arena is a decentralized chess gaming platform that combines the classic game of chess with blockchain technology. Built on Somnia Testnet and powered by Somnia Data Streams (SDS), it offers real-time, verifiable gameplay with a modern, beautiful interface.

### Why Quantum Chess Arena?

- **Instant Synchronization**: Real-time move updates using Somnia Data Streams
- **Blockchain Verified**: All moves recorded immutably on-chain
- **ELO Ranking System**: Persistent player ratings across sessions
- **Modern UI/UX**: Premium design with light/dark mode support
- **Fully Accessible**: WCAG AA compliant with keyboard navigation
- **Mobile Responsive**: Play on any device, anywhere

---

## Features

### Core Gameplay
- **Local Chess Games**: Play against friends or practice alone
- **Timed Matches**: 10-minute chess clock per player
- **Full Chess Rules**: Powered by chess.js for accurate validation
- **Move History**: Track all moves with standard chess notation
- **Check/Checkmate Detection**: Real-time game state alerts
- **Draw Conditions**: Stalemate detection and game ending

### Blockchain Features
- **Web3 Wallet Integration**: Connect with MetaMask, Rainbow, and more
- **Score Submission**: Submit game results to blockchain
- **Player Rankings**: On-chain ELO rating system
- **Leaderboard**: Live rankings with win rates and statistics
- **NFT Achievements**: Mint NFTs for milestones (planned)

### User Experience
- **Light/Dark Mode**: Smooth theme switching with persistence
- **Premium Design**: Gradient effects, animations, and polished UI
- **Smooth Animations**: 300-500ms transitions throughout
- **Ranking Badges**: Gold/Silver/Bronze medals for top players
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Keyboard Navigation**: Full keyboard accessibility

### Real-Time Features (SDS Integration)
- **Live Updates**: Instant move synchronization
- **Spectator Mode**: Watch games in real-time (planned)
- **Tournament Support**: Bracket management (planned)
- **Event Streaming**: Blockchain event subscriptions

---

## Technology Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **UI Library**: [React 19](https://react.dev/) - Latest React features
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- **Components**: [shadcn/ui](https://ui.shadcn.com/) - Accessible component library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful SVG icons
- **Animations**: [tw-animate-css](https://www.npmjs.com/package/tw-animate-css) - CSS animations

### Web3 & Blockchain
- **Web3 Hooks**: [Wagmi 2.19](https://wagmi.sh/) - React hooks for Ethereum
- **Wallet Connect**: [RainbowKit 2.2](https://www.rainbowkit.com/) - Wallet connection UI
- **Ethereum Client**: [Viem 2.37](https://viem.sh/) - TypeScript Ethereum interface
- **Smart Contracts**: [Solidity](https://soliditylang.org/) with [OpenZeppelin](https://www.openzeppelin.com/)
- **Development**: [Hardhat 2.27](https://hardhat.org/) - Ethereum development environment
- **Network**: [Somnia Testnet](https://somnia.network/) (Chain ID: 50312)
- **Data Streaming**: Somnia Data Streams (SDS) - Real-time blockchain events

### Game Logic
- **Chess Engine**: [chess.js 1.3](https://github.com/jhlywa/chess.js) - Chess move validation and game logic

### Development Tools
- **Package Manager**: npm with `--legacy-peer-deps`
- **Linting**: ESLint 9 with Next.js config
- **Type Checking**: TypeScript compiler
- **Build Tool**: Next.js built-in bundler
- **Deployment**: [Vercel](https://vercel.com/)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
  ```bash
  node --version  # Should be >= 18.0.0
  ```

- **npm**: Version 9.0 or higher
  ```bash
  npm --version  # Should be >= 9.0.0
  ```

- **Web3 Wallet**: MetaMask, Rainbow, or any WalletConnect-compatible wallet

- **Somnia Testnet Configuration**:
  - Network Name: Somnia Testnet
  - RPC URL: `https://rpc.somnia.network`
  - Chain ID: `50312`
  - Currency Symbol: `SOM`
  - Block Explorer: `https://explorer.somnia.network`

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quantum-chess-arena.git
cd quantum-chess-arena
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> **Note**: The `--legacy-peer-deps` flag is required due to peer dependency conflicts between React 19 and some packages.

### 3. Configure Environment (Optional)

If you need to deploy your own smart contracts:

```bash
# Create .env file
cp .env.example .env

# Edit .env with your configuration
# PRIVATE_KEY=your_wallet_private_key
# SOMNIA_RPC_URL=https://rpc.somnia.network
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Usage

### Starting a Game

1. **Connect Wallet**
   - Click the "Connect Wallet" button in the top navigation
   - Select your preferred wallet (MetaMask, Rainbow, etc.)
   - Approve the connection request
   - Ensure you're connected to Somnia Testnet

2. **Start New Game**
   - Click "Start Game" button on the landing page
   - Optionally enter opponent's wallet address (0x...)
   - Click "Start Game" to begin

3. **Play Chess**
   - **Move Pieces**: Click and drag pieces or click source → destination
   - **Turn Indicator**: Timer shows whose turn it is (highlighted with glow)
   - **Check Alert**: Red pulsing alert when in check
   - **Move History**: View all moves in standard notation
   - **Game Controls**: Pause, Restart, or End game at any time

4. **After Game Ends**
   - View game result (win/loss/draw)
   - Submit score to blockchain (optional)
   - Return to dashboard to see leaderboard

### Using the Leaderboard

- View top players with their ELO ratings
- See win/loss records and win rates
- Top 3 players have special medal badges
- Click on player addresses to view details

### Theme Switching

- **Toggle Icon**: Click Sun or Moon icon in top-right
- **Automatic Detection**: First visit matches your system theme
- **Persistence**: Theme preference saved across sessions
- **Smooth Transition**: 500ms animated theme changes

---

## Project Structure

```
quantum-chess-arena/
├── contracts/                  # Smart contract source files
│   └── QuantumChessArena.sol  # Main game contract
├── scripts/                    # Deployment and utility scripts
│   └── deploy.cjs             # Contract deployment script
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Landing page
│   │   ├── providers.tsx      # React context providers
│   │   └── globals.css        # Global styles and theme variables
│   ├── components/            # React components
│   │   ├── ChessBoard.tsx     # Interactive chess board
│   │   ├── GameRoom.tsx       # Game container with controls
│   │   ├── LeaderboardDisplay.tsx  # Player rankings
│   │   ├── ThemeToggle.tsx    # Light/dark mode toggle
│   │   └── ui/                # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   └── lib/                   # Utility functions and configurations
│       ├── sdsClient.ts       # Somnia Data Streams client
│       ├── ThemeProvider.tsx  # Theme management context
│       ├── utils.ts           # Utility functions
│       └── web3.ts            # Web3 configuration
├── public/                    # Static assets
├── typechain-types/          # Generated TypeScript types for contracts
├── artifacts/                # Compiled contract artifacts
├── cache/                    # Hardhat cache
├── hardhat.config.cjs        # Hardhat configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
├── deployment.json           # Deployed contract addresses
├── DESIGN_UPGRADE_SUMMARY.md     # Design system documentation
├── THEME_SYSTEM_DOCUMENTATION.md # Theme implementation guide
└── README.md                 # This file
```

---

## Smart Contracts

### Deployed Contract

- **Network**: Somnia Testnet
- **Address**: `0x5f481427Dc681635dDEE38255da2E98FcaC90CeE`
- **Explorer**: [View on Somnia Explorer](https://explorer.somnia.network/address/0x5f481427Dc681635dDEE38255da2E98FcaC90CeE)
- **Deployment Date**: November 13, 2025

### Contract Functions

The `QuantumChessArena.sol` contract provides:

- `createGame(address opponent)` - Start a new game
- `makeMove(uint256 gameId, string move)` - Submit a chess move
- `submitScore(bool won)` - Record game results
- `getPlayerStats(address player)` - Get player ELO and stats
- `getLeaderboard()` - Retrieve top players

### Deploying Your Own Contract

```bash
# Compile contracts
npx hardhat compile

# Deploy to Somnia Testnet
npx hardhat run scripts/deploy.cjs --network somniaTestnet

# Verify contract (optional)
npx hardhat verify --network somniaTestnet <CONTRACT_ADDRESS>
```

---

## Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Vercel-specific build (with legacy peer deps)
npm run vercel-build
```

### Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit components in `src/components/`
   - Update pages in `src/app/`
   - Modify styles in component files or `globals.css`

3. **Hot Reload**
   - Changes are automatically reflected in browser
   - Fast Refresh preserves component state

4. **Code Quality**
   ```bash
   # Run linter
   npm run lint

   # Type check
   npx tsc --noEmit
   ```

### Environment Variables

Create `.env.local` for local development:

```env
# Optional: For contract deployment
PRIVATE_KEY=your_wallet_private_key_without_0x
SOMNIA_RPC_URL=https://rpc.somnia.network

# Optional: For API keys
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Adding New Features

1. **Create Component**
   ```bash
   # Create in src/components/
   touch src/components/MyFeature.tsx
   ```

2. **Follow Patterns**
   - Use TypeScript for type safety
   - Use Tailwind for styling
   - Use lucide-react for icons
   - Follow existing component structure

3. **Update Documentation**
   - Add feature to README
   - Update relevant docs files

---

## Testing

### Manual Testing Checklist

- [ ] Wallet connection works
- [ ] Game starts successfully
- [ ] All chess pieces move correctly
- [ ] Check/checkmate detection works
- [ ] Timer counts down properly
- [ ] Move history displays accurately
- [ ] Pawn promotion works
- [ ] Theme toggle switches smoothly
- [ ] Leaderboard displays correctly
- [ ] Mobile responsive design works
- [ ] Dark mode renders properly

### Browser Compatibility

Tested and working on:
- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 5+)

### Smart Contract Testing

```bash
# Run Hardhat tests (if available)
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Run with coverage
npx hardhat coverage
```

---

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure build settings:
     - Build Command: `npm run vercel-build`
     - Output Directory: `.next`
     - Install Command: `npm install --legacy-peer-deps`

3. **Deploy**
   - Vercel automatically deploys on push to main
   - Preview deployments for pull requests
   - Custom domains supported

### Manual Deployment

```bash
# Build for production
npm run build

# Test production build locally
npm start

# Deploy to your hosting provider
# (Ensure Node.js 18+ is available)
```

### Environment Configuration

Set these in your hosting platform:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x5f481427Dc681635dDEE38255da2E98FcaC90CeE
NEXT_PUBLIC_CHAIN_ID=50312
```

---

## Documentation

### Additional Documentation

- **[DESIGN_UPGRADE_SUMMARY.md](./DESIGN_UPGRADE_SUMMARY.md)** - Complete design system documentation
  - Color palette and typography
  - Component patterns and animations
  - Responsive design approach
  - Performance considerations

- **[THEME_SYSTEM_DOCUMENTATION.md](./THEME_SYSTEM_DOCUMENTATION.md)** - Theme implementation guide
  - Architecture and components
  - Usage examples
  - Customization instructions
  - Troubleshooting guide

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Theme system implementation details
  - File changes summary
  - Testing checklist
  - Deployment guide

- **[README.HACKATHON.md](./README.HACKATHON.md)** - Original hackathon submission format
  - Inspiration and challenges
  - Technical deep-dive
  - Future roadmap

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [chess.js Documentation](https://github.com/jhlywa/chess.js)
- [Somnia Network Documentation](https://docs.somnia.network/)

---

## Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs

1. Check if the bug is already reported in [Issues](https://github.com/your-username/quantum-chess-arena/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

### Suggesting Features

1. Check [Issues](https://github.com/your-username/quantum-chess-arena/issues) for existing suggestions
2. Create a new issue labeled "feature request"
3. Describe the feature and its benefits
4. Provide examples or mockups if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request with:
   - Clear description of changes
   - Screenshots of UI changes
   - Test results

### Development Guidelines

- Follow existing code style
- Use TypeScript for type safety
- Write clear, descriptive commit messages
- Test on multiple browsers
- Update documentation as needed
- Keep changes focused and atomic

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Quantum Chess Arena

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## Acknowledgments

### Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component Library
- [RainbowKit](https://www.rainbowkit.com/) - Wallet Connection
- [chess.js](https://github.com/jhlywa/chess.js) - Chess Engine
- [Somnia Network](https://somnia.network/) - Blockchain Infrastructure

### Special Thanks

- Somnia team for Data Streams technology
- OpenZeppelin for secure smart contract libraries
- The Web3 development community
- All contributors and testers

---

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/your-username/quantum-chess-arena/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/quantum-chess-arena/discussions)
- **Website**: [quantum-chess-arena.vercel.app](https://quantum-chess-arena.vercel.app)
- **Smart Contract**: [View on Explorer](https://explorer.somnia.network/address/0x5f481427Dc681635dDEE38255da2E98FcaC90CeE)

---

## Roadmap

### Current Version (v0.1.0)
- Local chess gameplay
- Web3 wallet integration
- Smart contract deployment
- Leaderboard system
- Light/dark mode
- Premium UI design

### Upcoming Features

**v0.2.0 - Enhanced Gameplay**
- Real-time multiplayer with SDS
- Live spectator mode
- AI opponent integration
- Advanced statistics

**v0.3.0 - Social Features**
- In-game chat
- User profiles
- Achievement system
- Social sharing

**v0.4.0 - Tournaments**
- Tournament brackets
- Prize pools
- Scheduled events
- Multiple formats

**v1.0.0 - Production Release**
- Multi-chain support
- Mobile app (iOS/Android)
- Custom themes
- DAO governance

---

## Project Stats

- **Version**: 0.1.0
- **Contract Address**: 0x5f481427Dc681635dDEE38255da2E98FcaC90CeE
- **Network**: Somnia Testnet (Chain ID: 50312)
- **Deployment Date**: November 13, 2025
- **Last Updated**: November 24, 2025
- **Status**: Active Development

---

<div align="center">

**Made with care by the Quantum Chess Arena Team**

[Back to Top](#quantum-chess-arena)

</div>
