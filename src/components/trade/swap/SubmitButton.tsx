import { UnifiedWalletButton, useUnifiedWallet } from "@jup-ag/wallet-adapter";
import { Button } from "@/components/ui/button";
import { Token } from "@/lib/interfaces/tokensList";
import { useBalance } from "@/hooks/useBalance";
import { useMemo } from "react";

interface SubmitButtonProps {
  sellAmount: string | number;
  sellToken: Token | null;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function SubmitButton({
  sellAmount,
  sellToken,
  onSubmit,
  isLoading,
}: SubmitButtonProps) {
  const { connected } = useUnifiedWallet();
  const balance = useBalance(sellToken);

  // Ensure sellAmount is a valid number
  const numericSellAmount = Number(sellAmount);
  const isValidAmount = !isNaN(numericSellAmount) && numericSellAmount > 0;

  const insufficientBalance = useMemo(() => {
    return isValidAmount && (balance ?? 0) < numericSellAmount;
  }, [isValidAmount, numericSellAmount, balance]);

  const buttonContent = useMemo(() => {
    if (!connected) {
      return (
        <UnifiedWalletButton
          buttonClassName="w-full rounded-xl px-4 py-3 text-lg h-auto bg-cyan text-black shadow-md wallet-connect-button"
          currentUserClassName="w-full rounded-xl px-4 py-3 text-lg font-bold h-auto bg-black text-black shadow-md wallet-connect-button"
        />
      );
    }

    if (!isValidAmount) {
      return (
        <Button variant="secondary" className="w-full" disabled>
          Enter a valid amount
        </Button>
      );
    }

    if (insufficientBalance) {
      return (
        <Button variant="secondary" className="w-full" disabled>
          Insufficient Balance
        </Button>
      );
    }

    return (
      <Button
        variant="secondary"
        className="w-full"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Order'}
      </Button>
    );
  }, [connected, isValidAmount, insufficientBalance, onSubmit, isLoading]);

  return buttonContent;
}
