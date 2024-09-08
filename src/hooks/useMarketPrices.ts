import { TokenWithPriceFeed, tokenPriceFeedIds } from "@/lib/tokenPriceFeedIds";
import { useCallback, useEffect, useState } from "react";
import { PriceServiceConnection } from "@pythnetwork/price-service-client";
import { compact } from "lodash-es";

interface MarketPrices {
  sellingTokenToUSD: number | null;
  buyingTokenToUSD: number | null;
  sellingTokenToBuyingToken: number | null;
  isLoading: boolean;
}

const initialState: MarketPrices = {
  sellingTokenToUSD: null,
  buyingTokenToUSD: null,
  sellingTokenToBuyingToken: null,
  isLoading: false,
};

export default function useMarketPrices(
  sellingToken?: TokenWithPriceFeed | null,
  buyingToken?: TokenWithPriceFeed | null,
  fetchInterval = 30000,
) {
  const [marketPrices, setMarketPrices] = useState<MarketPrices>(initialState);

  const getMarketPrices = useCallback(async () => {
    if (!sellingToken && !buyingToken) return;

    setMarketPrices((prev) => ({ ...prev, isLoading: true }));

    const connection = new PriceServiceConnection("https://hermes.pyth.network");

    // Ensure feedIds are valid
    const feedIds = compact([sellingToken, buyingToken]).map(token => tokenPriceFeedIds[token]);

    // Handle missing feedIds
    if (feedIds.length === 0) {
      setMarketPrices((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      const latestPrices = await connection.getLatestPriceFeeds(feedIds);

      if (!latestPrices) {
        setMarketPrices((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const displayPrices = latestPrices.map(price => price.getPriceUnchecked().getPriceAsNumberUnchecked());

      if (displayPrices.length === 1) {
        setMarketPrices({
          sellingTokenToUSD: displayPrices[0],
          buyingTokenToUSD: null,
          sellingTokenToBuyingToken: null,
          isLoading: false,
        });
      } else if (displayPrices.length === 2) {
        const [sellingPrice, buyingPrice] = displayPrices;
        setMarketPrices({
          sellingTokenToUSD: sellingPrice,
          buyingTokenToUSD: buyingPrice,
          sellingTokenToBuyingToken: sellingPrice / buyingPrice,
          isLoading: false,
        });
      } else {
        setMarketPrices((prev) => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error("Error fetching market prices", error);
      setMarketPrices((prev) => ({ ...prev, isLoading: false }));
    }
  }, [buyingToken, sellingToken]);

  useEffect(() => {
    getMarketPrices();

    const interval = setInterval(getMarketPrices, fetchInterval);

    return () => clearInterval(interval);
  }, [getMarketPrices, fetchInterval]);

  return marketPrices;
}
