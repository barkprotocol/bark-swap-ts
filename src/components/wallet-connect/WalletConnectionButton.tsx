import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

const buttonStyles =
  "rounded-xl px-6 py-4 text-lg bg-black text-white shadow-md transition-all hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500";

export default function WalletConnectionButton() {
  return (
    <UnifiedWalletButton
      buttonClassName={buttonStyles}
      currentUserClassName={buttonStyles}
      aria-label="Connect Wallet"
    />
  );
}
