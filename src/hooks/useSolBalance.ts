import { useCallback, useEffect, useState } from "react";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function useSolBalance() {
  const { publicKey } = useUnifiedWallet();
  const { connection } = useConnection();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getBalance = useCallback(async () => {
    if (!publicKey || !connection) return;

    setLoading(true);
    setError(null);

    try {
      const balance =
        (await connection.getBalance(publicKey, "confirmed")) / LAMPORTS_PER_SOL;
      setSolBalance(balance);
    } catch (err) {
      console.error("Failed to fetch balance:", err);
      setError("Failed to fetch balance.");
    } finally {
      setLoading(false);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    getBalance();
  }, [getBalance, publicKey, connection]); // Added publicKey and connection to dependencies

  return { solBalance, loading, error };
}
