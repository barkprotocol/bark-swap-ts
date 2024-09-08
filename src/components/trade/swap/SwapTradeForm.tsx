"use client";

import { useCallback, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import AdditionalInfo from "./AdditionalInfo";
import SubmitButton from "./SubmitButton";
import TradeSelectors from "./TradeSelectors";
import TransactionMessage from "@/components/utils/TransactionMessage";
import { VersionedTransaction } from "@solana/web3.js";
import WarningMev from "@/components/utils/WarningMev";
import useDebounce from "@/hooks/useDebounce";
import useJupiterQuotes from "@/hooks/useJupiterQuotes";
import { useSwap } from "./SwapProvider";

export default function SwapTradeForm() {
  const {
    sellAmount,
    setBuyAmount,
    sellSelectedToken,
    buySelectedToken,
    orderStatus,
    setOrderStatus,
    setSolscanUrl,
    setErrorMessage,
  } = useSwap();

  const wallet = useWallet();
  const { connection } = useConnection();

  const throttledAmount = useDebounce(sellAmount, 1000);

  const { quote, outputAmount, isLoading } = useJupiterQuotes(
    setErrorMessage,
    setOrderStatus,
    sellSelectedToken,
    buySelectedToken,
    Number(throttledAmount),
  );

  useEffect(() => {
    if (outputAmount !== undefined) {
      setBuyAmount(outputAmount);
    }
  }, [outputAmount, setBuyAmount]);

  const onSubmit = useCallback(async () => {
    if (!wallet.connected || !wallet.signTransaction) {
      const errorMsg = "Wallet is not connected or does not support signing transactions";
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      setOrderStatus("ERROR");
      return;
    }

    try {
      const response = await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: wallet.publicKey?.toString(),
          wrapAndUnwrapSol: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching swap transaction: ${response.statusText}`);
      }

      const { swapTransaction } = await response.json();
      setOrderStatus("PENDING");

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const signedTransaction = await wallet.signTransaction(transaction);
      const rawTransaction = signedTransaction.serialize();

      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      setSolscanUrl(`https://solscan.io/tx/${txid}`);

      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid,
      }, "confirmed");

      setOrderStatus("SUBMITTED");
    } catch (error) {
      const errorMsg = (error as Error).message || "Error signing or sending the transaction";
      console.error(errorMsg);
      setErrorMessage(errorMsg);
      setOrderStatus("ERROR");
    }
  }, [wallet, connection, quote, setOrderStatus, setSolscanUrl, setErrorMessage]);

  if (orderStatus === "ERROR") {
    return (
      <TransactionMessage
        type="error"
        icon="report"
        mainMessage={setErrorMessage || "Error trying to get quote."}
        buttonText="Dismiss"
        buttonAction={() => setOrderStatus("INCOMPLETE")}
        aria-live="assertive"
      />
    );
  }

  return orderStatus === "PENDING" ? (
    <TransactionMessage
      type="pending"
      icon="progress_activity"
      mainMessage="Your order is being sent"
      aria-live="polite"
    />
  ) : (
    <div className="w-full h-full flex flex-col">
      <WarningMev />
      <TradeSelectors isLoading={isLoading} />
      <AdditionalInfo slippage={0.5} />
      <div className="mt-6">
        <SubmitButton
          sellAmount={sellAmount}
          sellToken={sellSelectedToken}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
