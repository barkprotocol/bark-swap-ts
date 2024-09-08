import { useCallback, useEffect, useState } from "react";
import { useConnection, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { PublicKey } from "@solana/web3.js";
import { TokenAmount } from "@/lib/interfaces/tokenAccounts";

interface TokenAccountBalanceState {
  amount: number | null;
  decimals: number | null;
  uiAmount: number | null;
  uiAmountString: string | null;
  loading: boolean;
  error: string | null;
}

export function useTokenAccountBalance(tokenMintAddress: PublicKey) {
  const { publicKey } = useUnifiedWallet();
  const { connection } = useConnection();

  const [balanceData, setBalanceData] = useState<TokenAccountBalanceState>({
    amount: null,
    decimals: null,
    uiAmount: null,
    uiAmountString: null,
    loading: true,
    error: null,
  });

  const getBalanceData = useCallback(async (address: PublicKey) => {
    if (!publicKey || !connection) return;

    setBalanceData(prev => ({ ...prev, loading: true }));

    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: address },
      );

      if (tokenAccounts.value.length <= 0) {
        setBalanceData({
          amount: null,
          decimals: null,
          uiAmount: null,
          uiAmountString: null,
          loading: false,
          error: 'No token accounts found for the provided mint address',
        });
        return;
      }

      const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount;
      setBalanceData({
        amount: balance.amount,
        decimals: balance.decimals,
        uiAmount: balance.uiAmount,
        uiAmountString: balance.uiAmountString,
        loading: false,
        error: null,
      });
    } catch (error) {
      setBalanceData({
        amount: null,
        decimals: null,
        uiAmount: null,
        uiAmountString: null,
        loading: false,
        error: (error as Error).message || 'An error occurred while fetching token balance',
      });
    }
  }, [connection, publicKey]);

  useEffect(() => {
    if (tokenMintAddress) {
      getBalanceData(tokenMintAddress);
    }
  }, [getBalanceData, tokenMintAddress]);

  return balanceData;
}
