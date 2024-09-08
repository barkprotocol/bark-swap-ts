import { Token } from "@/lib/interfaces/tokensList";

interface AdditionalInfoProps {
  sellToken?: Token | null;
  buyToken?: Token | null;
  sellingTokenToBuyingToken?: number;
  sellingTokenToUSD?: number | null;
  slippage?: number;
}

export default function AdditionalInfo({
  sellToken,
  buyToken,
  sellingTokenToBuyingToken,
  sellingTokenToUSD,
  slippage,
}: AdditionalInfoProps) {
  return (
    <div className="space-y-1">
      {sellingTokenToBuyingToken != null && sellToken && buyToken && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          1 {sellToken.symbol} = {sellingTokenToBuyingToken.toFixed(2)}{" "}
          {buyToken.symbol} (${sellingTokenToUSD?.toFixed(2) ?? "N/A"})
        </div>
      )}
      {slippage != null && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Slippage: {slippage.toFixed(2)}%
        </div>
      )}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Fee (0.0%) - (Alpha)
      </div>
    </div>
  );
}
