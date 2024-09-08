import {
  Keypair,
  NONCE_ACCOUNT_LENGTH,
  NonceAccount,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { useCallback } from "react";

export function useNonceAccount() {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useUnifiedWallet();

  const getNonceAccount = useCallback(
    async (nonceAccountPublicKey: PublicKey) => {
      try {
        const accountInfo = await connection.getAccountInfo(nonceAccountPublicKey);
        if (!accountInfo) throw new Error("No account info found");
        const nonceAccount = NonceAccount.fromAccountData(accountInfo.data);

        console.log("Auth:", nonceAccount.authorizedPubkey.toString());
        console.log("Nonce:", nonceAccount.nonce);

        return { ...nonceAccount, publicKey: nonceAccountPublicKey };
      } catch (error) {
        console.error("Error fetching nonce account:", error);
        throw error;
      }
    },
    [connection]
  );

  const createNonceAccount = useCallback(async () => {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signTransaction) throw new Error("Wallet does not support transaction signing!");

    try {
      const nonceAuthorityKeypair = Keypair.generate();
      const nonceKeypair = Keypair.generate();

      console.log("NonceAccountKeypair secret key:", nonceKeypair.secretKey.toString());
      console.log("NonceAccountKeypair public key:", nonceKeypair.publicKey.toString());

      const rent = await connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      const newNonceTx = new Transaction();
      newNonceTx.feePayer = publicKey;
      newNonceTx.recentBlockhash = blockhash;
      newNonceTx.lastValidBlockHeight = lastValidBlockHeight;
      newNonceTx.add(
        SystemProgram.createNonceAccount({
          fromPubkey: publicKey,
          noncePubkey: nonceKeypair.publicKey,
          lamports: rent,
          authorizedPubkey: nonceAuthorityKeypair.publicKey,
        })
      );
      newNonceTx.sign(nonceKeypair);

      const signedNonceTx = await signTransaction(newNonceTx);
      const signature = await connection.sendRawTransaction(signedNonceTx.serialize());
      await connection.confirmTransaction(
        {
          signature,
          blockhash,
          lastValidBlockHeight,
        },
        "finalized"
      );

      console.log("Nonce Account Created:", signature);

      const nonceAccount = await getNonceAccount(nonceKeypair.publicKey);

      return {
        ...nonceAccount,
        nonceAuthorityKeypair,
      };
    } catch (error) {
      console.error("Failed to create nonce account:", error);
      throw error;
    }
  }, [connection, getNonceAccount, publicKey, signTransaction]);

  return { getNonceAccount, createNonceAccount };
}
