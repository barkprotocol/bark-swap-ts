import Image from "next/image";
import { Token } from "@/lib/interfaces/tokensList";

interface TokenSelectorButtonProps {
  onClick: () => void;
  token: Token | null;
}

export default function TokenSelectorButton({
  onClick,
  token,
}: TokenSelectorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-center font-medium rounded-xl bg-white hover:bg-gray-100 hover:text-black transition-colors px-3 py-2 shadow-md select-none text-black min-h-11 min-w-32"
      aria-label={token ? `Selected token: ${token.symbol}` : "Select a token"}
    >
      {!token ? (
        <span className="text-sm">Select a token</span>
      ) : (
        <>
          <Image
            className="rounded-full mr-3"
            width={30}
            height={30}
            src={token.logoURI || "/assets/default-token.png"}
            alt={`Logo of ${token.symbol}`}
            onError={(e) => (e.currentTarget.src = "/assets/default-token.png")}
          />
          <span className="font-semibold text-base">{token.symbol}</span>
          <span className="material-symbols-rounded ml-1 text-base">
            keyboard_arrow_down
          </span>
        </>
      )}
    </button>
  );
}
