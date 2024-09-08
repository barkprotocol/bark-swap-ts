import { Modal, TextInput } from "@mantine/core";
import { Token } from "@/lib/interfaces/tokensList";
import TokenListItem from "./TokenListItem";
import { useFilteredTokens } from "@/hooks/useFilteredTokens";
import { useState, useCallback } from "react";

interface TokenListModalProps {
  opened: boolean;
  close: () => void;
  setSelectedToken: (token: Token) => void;
}

export default function TokenListModal({
  opened,
  close,
  setSelectedToken,
}: TokenListModalProps) {
  const [inputText, setInputText] = useState("");
  const filteredTokensList = useFilteredTokens(inputText);

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.currentTarget.value);
  }, []);

  const handleTokenSelect = useCallback((token: Token) => {
    setSelectedToken(token);
    close();
  }, [setSelectedToken, close]);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setInputText(""); // Clear search input when modal closes
        close();
      }}
      title="Select a token"
      centered
      radius="lg"
      classNames={{
        content: "bg-white",
        header: "bg-white sticky",
        title: "font-bold text-black",
      }}
    >
      <TextInput
        radius="lg"
        size="lg"
        placeholder="Search name or paste address"
        value={inputText}
        onChange={handleSearchChange}
        aria-label="Search tokens"
        classNames={{
          input: "bg-cream-light focus:ring-0 focus:border-0",
        }}
      />

      <div className="mt-4">
        {filteredTokensList.length > 0 ? (
          filteredTokensList.map((item) => (
            <TokenListItem
              key={item.address}
              item={item}
              onClick={() => handleTokenSelect(item)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tokens found</p>
        )}
      </div>
    </Modal>
  );
}
