import { convertRelativeTimeToUTCTimestamp, getSolAmount } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import axios from "@/app/api/axios";
import { useSwap } from "@/components/trade/swap/SwapProvider";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { v4 as uuidv4 } from 'uuid';

export function useSubmitLimitOrder() {
  const {
    sellAmount,
    sellSelectedToken: sellToken,
    buyAmount,
    buySelectedToken: buyToken,
    expireTime,
    setOrderStatus,
    setErrorMessage,
  } = useSwap();

  const { publicKey } = useUnifiedWallet();

  // Memoized transaction data
  const transactionData = useMemo(() => {
    // Ensure all necessary fields are available
    const srcAmount = sellAmount ? getSolAmount(sellAmount, sellToken?.decimals ?? 1) : 0;
    const minReceived = buyAmount ? getSolAmount(buyAmount, buyToken?.decimals ?? 1) : 0;
    const exp = expireTime ? convertRelativeTimeToUTCTimestamp(expireTime) : null;

    return {
      srcToken: sellToken?.address || "",
      srcAddress: publicKey?.toString() || "",
      srcAmount,
      dstToken: buyToken?.address || "",
      dstAddress: publicKey?.toString() || "",
      minReceived,
      exp,
      isPartiallyFillable: false,
      agentSource: "swap",
    };
  }, [sellToken, publicKey, sellAmount, buyAmount, buyToken, expireTime]);

  const submitLimitOrder = useCallback(async () => {
    if (!publicKey) {
      setErrorMessage("Wallet not connected.");
      return;
    }

    try {
      setOrderStatus("PENDING");

      const params = {
        intentId: uuidv4(), // Use UUID for unique intentId
        srcToken: transactionData.srcToken,
        srcAddress: transactionData.srcAddress,
        srcAmount: transactionData.srcAmount,
        dstToken: transactionData.dstToken,
        dstAddress: transactionData.dstAddress,
        minReceived: transactionData.minReceived,
        expiration: transactionData.exp,
      };

      console.info("Submitting order to API", params);

      const { data } = await axios.post("/orders", params);

      console.log("Order submitted successfully", data);

      setOrderStatus("SUBMITTED");
    } catch (error) {
      // Capture specific error messages from the response
      const errorMessage = error.response?.data?.message || error.message || "An unknown error occurred.";
      console.error("Error submitting the order:", error);
      setErrorMessage(errorMessage);
      setOrderStatus("ERROR");
    }
  }, [transactionData, publicKey, setOrderStatus, setErrorMessage]);

  return submitLimitOrder;
}
