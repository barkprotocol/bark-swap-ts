import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

const classes =
  "rounded-xl px-6 py-4 text-lg h-auto bg-cyan text-black shadow-md wallet-connect-button";

export default function WalletConnectionButton() {
  return (
    <UnifiedWalletButton
      buttonClassName={classes}
      currentUserClassName={classes}
    />
  );
}
