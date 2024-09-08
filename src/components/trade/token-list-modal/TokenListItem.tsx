import Image from "next/image";
import React from "react";

interface TokenListItemProps {
  item: {
    balance?: number; // Make balance optional or ensure it is a number
    symbol: string;
    logoURI?: string;
    // Add other properties as needed
  };
  onClick: () => void;
}

export default function TokenListItem({ item, onClick }: TokenListItemProps) {
  // Safely handle balance to avoid errors
  const balance = typeof item.balance === 'number'
    ? item.balance.toFixed(2)
    : 'N/A';

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-3 bg-white hover:bg-gray-100 text-black rounded-lg shadow-md transition-all"
      aria-label={`Select ${item.symbol} with balance ${balance}`}
      role="listitem"
    >
      <div className="flex items-center">
        <Image
          src={item.logoURI || "https://ucarecdn.com/b065ba1f-6279-4677-ae8f-0ebc1facb68d/bark_icon.png"} // Default image if logoURI is not provided
          alt={`Logo of ${item.symbol}`}
          className="w-10 h-10 rounded-full mr-3"
          width={40} // Width for Image component
          height={40} // Height for Image component
        />
        <span className="font-semibold">{item.symbol}</span>
      </div>
      <span className="text-gray-600">{balance}</span>
    </button>
  );
}
