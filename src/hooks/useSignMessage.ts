import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import { useCallback } from "react";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { verify } from "@noble/ed25519";

// Add custom SHA-512 function to `ed.etc` namespace
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

export function useSignMessage() {
  const { publicKey, signMessage } = useUnifiedWallet();

  const getMessageSignature = useCallback(
    async (data: Record<string, unknown>): Promise<Uint8Array> => {
      // Check if the wallet is connected and supports signing
      if (!publicKey) throw new Error("Wallet not connected!");
      if (!signMessage) throw new Error("Wallet does not support message signing!");

      try {
        // Encode the data as a JSON string
        const message = new TextEncoder().encode(JSON.stringify(data));

        // Sign the message
        const signature = await signMessage(message);

        // Verify the signature
        const isValid = await verify(signature, message, publicKey.toBytes());

        if (!isValid) throw new Error("Invalid signature!");

        return signature;
      } catch (error) {
        // Handle errors appropriately
        console.error("Error signing message:", error);
        throw error;
      }
    },
    [publicKey, signMessage],
  );

  return getMessageSignature;
}
