"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { OrderStatus } from "@/lib/interfaces/OrderStatus";
import { Token } from "@/lib/interfaces/tokensList";
import { useTokenList } from "@/hooks/useTokenList";

interface SwapContextProps {
  sellAmount: string | number;
  setSellAmount: (value: string | number) => void;
  buyAmount: string | number;
  setBuyAmount: (value: string | number) => void;
  sellSelectedToken: Token | null;
  setSellSelectedToken: (token: Token | null) => void;
  buySelectedToken: Token | null;
  setBuySelectedToken: (token: Token | null) => void;
  minReceived: string | number;
  setMinReceived: (value: string | number) => void;
  expireTime: string | null;
  setExpireTime: (value: string | null) => void;
  orderStatus: OrderStatus;
  setOrderStatus: (status: OrderStatus) => void;
  solscanUrl: string;
  setSolscanUrl: (url: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  resetAll: () => void;
}

const initialValue: SwapContextProps = {
  sellAmount: "",
  setSellAmount: () => {},
  buyAmount: "",
  setBuyAmount: () => {},
  sellSelectedToken: null,
  setSellSelectedToken: () => {},
  buySelectedToken: null,
  setBuySelectedToken: () => {},
  minReceived: "",
  setMinReceived: () => {},
  expireTime: null,
  setExpireTime: () => {},
  orderStatus: "INCOMPLETE",
  setOrderStatus: () => {},
  solscanUrl: "",
  setSolscanUrl: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  resetAll: () => {},
};

const SwapContext = createContext<SwapContextProps>(initialValue);

export function SwapProvider({ children }: PropsWithChildren) {
  const tokenList = useTokenList();

  const [sellAmount, setSellAmount] = useState<string | number>("");
  const [buyAmount, setBuyAmount] = useState<string | number>("");
  const [sellSelectedToken, setSellSelectedToken] = useState<Token | null>(
    tokenList[0] || null
  );
  const [buySelectedToken, setBuySelectedToken] = useState<Token | null>(null);
  const [minReceived, setMinReceived] = useState<string | number>("");
  const [expireTime, setExpireTime] = useState<string | null>("1|d");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("INCOMPLETE");
  const [solscanUrl, setSolscanUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resetAll = useCallback(() => {
    setSellAmount("");
    setBuyAmount("");
    setSellSelectedToken(null);
    setBuySelectedToken(null);
    setMinReceived("");
    setExpireTime("1|d");
    setOrderStatus("INCOMPLETE");
    setSolscanUrl("");
    setErrorMessage("");
  }, []);

  const value = useMemo(() => ({
    sellAmount,
    setSellAmount,
    buyAmount,
    setBuyAmount,
    sellSelectedToken,
    setSellSelectedToken,
    buySelectedToken,
    setBuySelectedToken,
    minReceived,
    setMinReceived,
    expireTime,
    setExpireTime,
    orderStatus,
    setOrderStatus,
    solscanUrl,
    setSolscanUrl,
    errorMessage,
    setErrorMessage,
    resetAll,
  }), [
    sellAmount,
    buyAmount,
    sellSelectedToken,
    buySelectedToken,
    minReceived,
    expireTime,
    orderStatus,
    solscanUrl,
    errorMessage,
    resetAll,
  ]);

  return <SwapContext.Provider value={value}>{children}</SwapContext.Provider>;
}

export const useSwap = () => {
  const context = useContext(SwapContext);

  if (!context) {
    throw new Error("useSwap must be used within a SwapProvider");
  }

  return context;
};
