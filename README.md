# BarkSwap

Bark**Swap** is an interface that allows users to submit Solana order intents for consumption by the BARK Protocol. It provides a streamlined way to manage and execute token swaps on the Solana blockchain.

## Features

- **Order Submission**: Easily submit order intents for Solana token swaps.
- **Integration with BARK Protocol**: Seamless interaction with the BARK Protocol for executing trades.
- **User-Friendly Interface**: Designed with a clean and intuitive UI for managing orders.

## Tech Stack

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **React**: A component-based JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vercel**: A platform for frontend frameworks and static sites.
- **Mantine**: A React + Tailwind component library offering prebuilt components for complex use cases.

## External Documentation

- **Token List by Trust Wallet**: [Token List](https://trustwallet.com/tokenlist) - A comprehensive list of tokens used for Solana applications.
- **Wallet Adapter**: [Wallet Adapter Documentation](https://github.com/solana-labs/wallet-adapter) - Modular TypeScript wallet adapters and components for Solana applications.
- **Jupiter**: [Jupiter Docs](https://jup.ag/docs) - For handling market orders within the Swap platform.
- **Pyth**: [Pyth Documentation](https://pyth.network/docs) - For Price Feeds on Limit Orders.
- **Hellius**: [Hellius RPC Provider](https://hellius.dev) - An RPC provider for reliable communication with the Solana blockchain in Mainnet. Used for fetching token balances and submitting intents for Market Orders.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/barkprotocol/barkswap.git
   cd barkswap
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
NEXT_PUBLIC_SOLANA_NETWORK=Devnet
HELIUS_API_KEY=""
PROTOCOL_PROGRAM_ID_PUBLIC_KEY=
NONCE_AUTHORITY_ACCOUNT_SECRET_KEY=
NONCE_AUTHORITY_ACCOUNT_PUBLIC_KEY=
NONCE_ACCOUNT_PUBLIC_KEY=
NONCE_ACCOUNT_SECRET_KEY=""
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

5. **Deploy**

   For deployment, push your changes to your repository, and Vercel will automatically deploy the application.

## Contributing

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
