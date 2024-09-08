"use client";

import { useCallback, useEffect } from "react";
import InverterButton from "../InverterButton";
import LimitPrice from "./LimitPrice";
import SelectTime from "./SelectTime";
import SubmitButton from "../swap/SubmitButton";
import TokenSelector from "../TokenSelector";
import TransactionMessage from "@/components/utils/TransactionMessage";
import { useInvertAmounts } from "@/hooks/useInvertAmounts";
import useMarketPrices from "@/hooks/useMarketPrices";
import { useSubmitLimitOrder } from "@/hooks/useSubmitLimitOrder";
import { useSwap } from "../swap/SwapProvider";

export default function LimitForm() {
  // Destructure swap state and setters
  const {
    sellAmount,
    setSellAmount,
    buyAmount,
    setBuyAmount,
    sellSelectedToken,
    setSellSelectedToken,
    buySelectedToken,
    setBuySelectedToken,
    minReceived,
    setMinReceived,
    expireTime,
    setExpireTime,
    orderStatus,
  } = useSwap();

  const invertAmounts = useInvertAmounts();
  const {
    sellingTokenToBuyingToken,
    sellingTokenToUSD,
    buyingTokenToUSD,
    isLoading,
  } = useMarketPrices(sellSelectedToken?.symbol, buySelectedToken?.symbol);

  const onSubmit = useSubmitLimitOrder();

  // Calculate minimum received amount based on token conversion rate
  const resetToMarket = useCallback(() => {
    if (sellingTokenToBuyingToken) {
      setMinReceived(sellingTokenToBuyingToken.toFixed(4));
    }
  }, [sellingTokenToBuyingToken, setMinReceived]);

  // Update buy amount when min received or sell amount changes
  useEffect(() => {
    if (minReceived && sellAmount) {
      setBuyAmount((Number(sellAmount) * Number(minReceived)).toFixed(4));
    }
  }, [minReceived, sellAmount, setBuyAmount]);

  // Reset minimum received amount when token conversion rate changes
  useEffect(() => {
    if (sellingTokenToBuyingToken) {
      resetToMarket();
    }
  }, [sellingTokenToBuyingToken, resetToMarket]);

  // Handle order status
  if (orderStatus === "PENDING") {
    return (
      <TransactionMessage
        type="pending"
        icon="progress_activity"
        mainMessage="Your order is being sent"
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <TokenSelector
        label="Sell Amount"
        inputValue={sellAmount}
        setInputValue={setSellAmount}
        setSelectedToken={setSellSelectedToken}
        selectedToken={sellSelectedToken}
        tokenToUSDPrice={sellingTokenToUSD}
      />
      <InverterButton
        onInvert={invertAmounts}
        icon="arrow_downward"
        isLoading={isLoading}
      />
      <TokenSelector
        label="Received at least"
        inputValue={buyAmount}
        setInputValue={setBuyAmount}
        setSelectedToken={setBuySelectedToken}
        selectedToken={buySelectedToken}
        tokenToUSDPrice={buyingTokenToUSD}
      />
      <LimitPrice
        inputValue={minReceived}
        resetToMarket={resetToMarket}
        setInputValue={setMinReceived}
      />
      <SelectTime setExpireTime={setExpireTime} expireTime={expireTime} />
      <div className="mt-4 md:mt-8"> {/* Added a top margin for better spacing */}
        <SubmitButton
          onSubmit={onSubmit}
          sellAmount={sellAmount}
          sellToken={sellSelectedToken}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
