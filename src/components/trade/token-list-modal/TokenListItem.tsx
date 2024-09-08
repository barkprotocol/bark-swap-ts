import Image from "next/image";
import { TokenWithBalance } from "@/lib/interfaces/tokensList";

interface TokenListItemProps {
  item: TokenWithBalance;
  onClick: () => void;
}

export default function TokenListItem({ item, onClick }: TokenListItemProps) {
  const balance = item.balance != null ? item.balance.toFixed(2) : 'N/A';

  return (
    <button
      className="w-full block hover:bg-gray-100 transition-colors duration-200 px-4 py-3 my-2 rounded-lg flex items-center"
      onClick={onClick}
      aria-label={`Select ${item.symbol} token`}
    >
      <div className="flex items-center w-full">
        <div className="flex-shrink-0 mr-3">
          <Image
            className="rounded-full"
            width={35}
            height={35}
            src={item.logoURI || "https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"}
            alt={`Logo of ${item.name}`}
            layout="intrinsic"
          />
        </div>
        <div className="flex flex-col flex-grow text-left">
          <span className="font-medium text-lg">{item.symbol}</span>
          <span className="text-sm text-gray-600">{item.name}</span>
        </div>
        {item.balance != null && (
          <div className="text-right flex-shrink-0">
            <span className="text-sm text-gray-600">
              {balance}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
