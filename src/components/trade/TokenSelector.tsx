import { NumberInput } from "@mantine/core";
import { Token } from "@/lib/interfaces/tokensList";
import TokenListModal from "./token-list-modal/TokenListModal";
import TokenSelectorButton from "./TokenSelectorButton";
import { useDisclosure } from "@mantine/hooks";

interface TokenSelectorProps {
  inputValue: string | number;
  setInputValue: (value: string | number) => void;
  selectedToken: Token | null;
  setSelectedToken: (token: Token) => void;
  tokenToUSDPrice?: number | null;
  label?: string;
}

export default function TokenSelector({
  inputValue,
  setInputValue,
  selectedToken,
  setSelectedToken,
  tokenToUSDPrice,
  label,
}: TokenSelectorProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const convertedToUSD =
    tokenToUSDPrice &&
    inputValue &&
    (Number(inputValue) * tokenToUSDPrice).toFixed(2);

  return (
    <>
      <div className="relative rounded-xl border border-gray-300 bg-white hover:border-gray-500 transition-all">
        <NumberInput
          label={label}
          aria-label="Enter Amount"
          variant="unstyled"
          clampBehavior="strict"
          allowNegative={false}
          leftSection={
            <TokenSelectorButton onClick={open} token={selectedToken} />
          }
          hideControls
          size="xl"
          value={inputValue}
          onChange={setInputValue}
          placeholder="0.00"
          classNames={{
            label: "ml-4 mt-4 text-sm font-semibold text-gray-700",
            section: "ml-2 w-auto -mt-2",
            input: "text-right text-black pr-3 rounded-xl text-xl border-0 bg-transparent",
          }}
        />
        {convertedToUSD && (
          <div className="absolute bottom-3 right-3 text-xs text-gray-600">
            ≈ $ {convertedToUSD}
          </div>
        )}
      </div>
      <TokenListModal
        opened={opened}
        open={open}
        close={close}
        setSelectedToken={setSelectedToken}
      />
    </>
  );
}
