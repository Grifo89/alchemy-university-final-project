# Alchemy University Succeed (AUS) DApp

## Overview

This is the final project for Alchemy University Ethereum Developer Bootcamp. This decentralized application (DApp) allows users to make transactions of the ERC20 token called Alchemy University Succeed (AUS). The application is built using ReactJS, Hardhat, Ethers, and Chakra-UI. It is designed to run locally using the MetaMask wallet.

## Features

- View AUS token balance
- Send AUS tokens to other addresses
- Receive AUS tokens from other addresses
- Connect with MetaMask wallet
- Transaction history

## Prerequisites

Before running this DApp locally, make sure you have the following installed:

- Node.js
- MetaMask extension in your browser
- Hardhat
- Ethers
- Chakra-UI

## Installation

1. Clone this repository.
2. Install dependencies by running `npm install`.
3. Start the local blockchain network using Hardhat: `npx hardhat node`.
4. Deploy the smart contract using Hardhat: `npx hardhat run scripts/deploy.js`.
5. Start the React app: `npm run dev`.

## Usage

1. Connect your MetaMask wallet to the local network.
2. Import some accounts from you local network to Metamask
3. Interact with the DApp to send or receive AUS tokens.
4. View your transaction history.

## Smart Contract

The smart contract for the AUS token is deployed on the local network. You can find the contract code in the `contracts` directory.

## Known Issues

- No known issues at the moment.

## Future Improvements

- Implement additional security features.
- Enhance user interface and experience.
- Add support for more ERC20 tokens.

## Contributors

- Christian Miño <calaca89@gmail.com>

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

Feel free to customize this README file according to your specific project details and requirements.
