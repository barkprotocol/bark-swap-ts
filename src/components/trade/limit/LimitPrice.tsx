import { Button } from "../../ui/button";
import { NumberInput } from "@mantine/core";

interface LimitPriceProps {
  inputValue: number;
  setInputValue: (value: number | undefined) => void;
  resetToMarket: () => void;
  label?: string;
}

export default function LimitPrice({
  inputValue,
  setInputValue,
  resetToMarket,
  label = "Limit price",
}: LimitPriceProps) {
  return (
    <div className="rounded-2xl border-2 border-cream-light hover:border-gray bg-cream-light selection:text-black-medium selection:bg-black-medium-dark">
      <NumberInput
        aria-label={label}
        variant="unstyled"
        clampBehavior="strict"
        label={label}
        rightSection={
          <Button
            size="xs"
            onClick={resetToMarket}
            aria-label="Reset to market price"
          >
            Set to market
          </Button>
        }
        hideControls
        size="xl"
        value={inputValue}
        onChange={setInputValue}
        placeholder="0.00"
        classNames={{
          section: "-mt-20 md:-mt-24 mr-2 w-auto",
          label: "ml-4 mt-4 text-sm font-bold text-black",
          input:
            "text-right text-black pr-3 rounded-2xl text-xl sm:text-3xl border-0 focus:ring-0 focus:border-0 md:min-h-20 bg-transparent relative z-10",
        }}
      />
    </div>
  );
}
