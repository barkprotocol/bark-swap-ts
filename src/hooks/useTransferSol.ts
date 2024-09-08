import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { useCallback } from "react";

export function useTransferSol() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useUnifiedWallet();

  const transferSol = useCallback(
    async (toAccountPublicKey: PublicKey, amount: number) => {
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signTransaction) throw new Error("Wallet does not support transaction signing!");

      try {
        // Check the balance of the wallet
        const walletBalance = await connection.getBalance(publicKey);
        const transferAmount = amount * LAMPORTS_PER_SOL;
        const transactionFee = await connection.getMinimumBalanceForRentExemption(Transaction.getPayer().length); // Estimate fee

        if (walletBalance < transferAmount + transactionFee) {
          throw new Error("Insufficient balance to cover transfer amount and transaction fee.");
        }

        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

        const fundTransferTx = new Transaction();
        fundTransferTx.feePayer = publicKey;
        fundTransferTx.recentBlockhash = blockhash;
        fundTransferTx.lastValidBlockHeight = lastValidBlockHeight;
        fundTransferTx.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: toAccountPublicKey,
            lamports: transferAmount,
          }),
        );

        // Sign the transaction
        const signedTx = await signTransaction(fundTransferTx);

        // Send the transaction
        const signature = await connection.sendRawTransaction(signedTx.serialize(), {
          skipPreflight: false,
          preflightCommitment: "singleGossip",
        });

        // Wait for transaction confirmation
        const confirmation = await connection.confirmTransaction(
          {
            signature,
            blockhash,
            lastValidBlockHeight,
          },
          "finalized" // Consider using "confirmed" for faster response
        );

        return confirmation;
      } catch (error) {
        console.error("Transaction failed:", error);
        throw new Error(`Transaction failed: ${error.message}`);
      }
    },
    [connection, publicKey, signTransaction]
  );

  return transferSol;
}
