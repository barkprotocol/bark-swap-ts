import { Keypair, PublicKey } from "@solana/web3.js";
import { Env } from "./interfaces/env";

export const CMS_NAME = "BarkSwap";

/**
 * Get the protocol program ID from environment variables.
 * @param env - Environment variables interface
 * @returns Protocol program ID as PublicKey
 * @throws Error if the program ID is not defined or invalid
 */
export function getProtocolProgramId(env: Env): PublicKey {
  const programId = env.protocolProgramIdPubkey;
  if (!programId) {
    throw new Error("Protocol Program ID is not defined in the environment variables.");
  }
  try {
    return new PublicKey(programId);
  } catch (error) {
    throw new Error(`Invalid Protocol Program ID: ${programId}`);
  }
}

/**
 * Get the nonce authority account Keypair from environment variables.
 * @param env - Environment variables interface
 * @returns Nonce authority account Keypair
 * @throws Error if the secret key is not defined or invalid
 */
export function getNonceAuthorityAccountKeypair(env: Env): Keypair {
  const secretKeyStr = env.nonceAuthorityAccountSecretKey;
  if (!secretKeyStr) {
    throw new Error("Nonce Authority Account Secret Key is not defined in the environment variables.");
  }
  try {
    const secretKeyArray = Uint8Array.from(
      secretKeyStr.split(",").map((str) => parseInt(str.trim(), 10))
    );
    if (secretKeyArray.length !== 64) { // Validate length for Solana Keypair
      throw new Error("Nonce Authority Account Secret Key must be 64 integers.");
    }
    return Keypair.fromSecretKey(secretKeyArray);
  } catch (error) {
    throw new Error("Failed to parse Nonce Authority Account Secret Key. Ensure it is a comma-separated list of integers.");
  }
}

/**
 * Get the nonce account PublicKey from environment variables.
 * @param env - Environment variables interface
 * @returns Nonce account PublicKey
 * @throws Error if the public key is not defined or invalid
 */
export function getNonceAccountPublicKey(env: Env): PublicKey {
  const nonceAccountPubkey = env.nonceAccountPubkey;
  if (!nonceAccountPubkey) {
    throw new Error("Nonce Account Public Key is not defined in the environment variables.");
  }
  try {
    return new PublicKey(nonceAccountPubkey);
  } catch (error) {
    throw new Error(`Invalid Nonce Account Public Key: ${nonceAccountPubkey}`);
  }
}
