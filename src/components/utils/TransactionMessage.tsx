import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSwap } from "../trade/swap/SwapProvider";

interface TransactionMessageProps {
  type: "success" | "error" | "pending";
  icon: string;
  mainMessage: string;
  solscanUrl?: string;
  buttonText?: string;
  buttonAction?: () => void;
  linkTo?: string;
}

export default function TransactionMessage({
  type,
  icon,
  mainMessage,
  solscanUrl,
  buttonText,
  buttonAction,
  linkTo,
}: TransactionMessageProps) {
  const { sellAmount, buyAmount, sellSelectedToken, buySelectedToken } = useSwap();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-center mt-16">
        <span
          className={`material-symbols-rounded ${
            type === "pending" ? "animate-spin" : ""
          } text-9xl ${
            type === "error" ? "text-destructive" : "text-cyan-dark"
          }`}
          aria-hidden="true"
        >
          {icon}
        </span>
        <p className="my-10 text-2xl font-bold break-words">
          {mainMessage}
          {type === "error" && (
            <>
              <br />
              Please try again.
            </>
          )}
        </p>
        {solscanUrl && (
          <p className="my-10 text-xl">
            Check the transaction:{" "}
            <a
              href={solscanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="italic text-green-500"
            >
              solscan.io
            </a>
          </p>
        )}
        {sellSelectedToken && buySelectedToken && sellAmount && buyAmount && (
          <div className="flex items-center justify-center font-bold my-12">
            <div className="flex items-center">
              <Image
                className="rounded-full mr-3"
                width={25}
                height={25}
                src={sellSelectedToken.logoURI}
                alt={`${sellSelectedToken.symbol} logo`}
              />
              {sellAmount}
              <span className="ml-2">{sellSelectedToken.symbol}</span>
            </div>
            <span className="material-symbols-rounded mx-3">arrow_forward</span>

            <div className="flex items-center">
              <Image
                className="rounded-full mr-3"
                width={25}
                height={25}
                src={buySelectedToken.logoURI}
                alt={`${buySelectedToken.symbol} logo`}
              />
              {buyAmount}
              <span className="ml-2">{buySelectedToken.symbol}</span>
            </div>
          </div>
        )}
      </div>
      {buttonText && (
        linkTo ? (
          <Link href={linkTo}>
            <Button
              variant={type === "error" ? "destructive" : "secondary"}
              className="w-full"
              onClick={buttonAction}
            >
              {buttonText}
            </Button>
          </Link>
        ) : (
          <Button
            variant={type === "error" ? "destructive" : "secondary"}
            className="w-full"
            onClick={buttonAction}
          >
            {buttonText}
          </Button>
        )
      )}
    </div>
  );
}
