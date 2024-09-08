import Image from "next/image";
import { TokenWithBalance } from "@/lib/interfaces/tokensList";

interface TokenListItemProps {
  item: TokenWithBalance;
  onClick: () => void;
}

export default function TokenListItem({ item, onClick }: TokenListItemProps) {
  return (
    <button
      key={item.address}
      className="w-full block hover:bg-cream-light transition-all px-4 py-2 my-2 rounded-lg"
      onClick={onClick}
      aria-label={`Select ${item.symbol} token`}
    >
      <div className="flex items-center">
        <div className="text-4xl mr-3">
          <Image
            className="rounded-full"
            width={35}
            height={35}
            src={item.logoURI || "/default-token-logo.png"} // Provide a default image if logoURI is not available
            alt={`Logo of ${item.name}`}
            layout="intrinsic" // Adjust based on layout needs
          />
        </div>
        <div className="flex flex-col flex-grow text-left">
          <span className="font-medium">{item.symbol}</span>
          <span className="text-xs text-gray-500">{item.name}</span>
        </div>
        {item.balance != null && (
          <div className="text-right">
            <span className="text-xs text-gray-500">
              {item.balance.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
