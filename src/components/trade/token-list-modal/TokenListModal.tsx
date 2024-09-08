import { Modal, TextInput } from "@mantine/core";
import { Token } from "@/lib/interfaces/tokensList";
import TokenListItem from "./TokenListItem";
import { useFilteredTokens } from "@/hooks/useFilteredTokens";
import { useState } from "react";

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

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setInputText("");
        close();
      }}
      title="Select a token"
      centered
      radius="lg"
      classNames={{
        content: "bg-white",
        header: "bg-white sticky",
        title: "font-bold text-black", // Changed from text-purple to text-black
      }}
    >
      <TextInput
        radius="lg"
        size="lg"
        placeholder="Search name or paste address"
        value={inputText}
        onChange={(event) => setInputText(event.currentTarget.value)}
        aria-label="Search tokens"
        classNames={{
          input: "bg-cream-light focus:ring-0 focus:border-0",
        }}
      />

      <div className="-mx-4 mt-4">
        {filteredTokensList.length > 0 ? (
          filteredTokensList.map((item) => (
            <TokenListItem
              key={item.address}
              item={item}
              onClick={() => {
                setSelectedToken(item);
                close();
              }}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tokens found</p>
        )}
      </div>
    </Modal>
  );
}
