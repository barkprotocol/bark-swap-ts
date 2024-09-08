"use client";

import { Fragment, useMemo } from "react";
import { format, fromUnixTime } from "date-fns";
import Image from "next/image";
import { Skeleton, Table } from "@mantine/core";
import { useTokenList } from "@/hooks/useTokenList";
import { getDecimals, getSymbol, getTokenIcon, getUiAmount } from "@/lib/utils";

interface OrderIntent {
  intentId: string;
  srcToken: string;
  srcAddress: string;
  srcAmount: number;
  dstToken: string;
  dstAddress: string;
  minReceived: number;
  expiration: number;
  batchId?: string | null;
  status: string;
}

interface TableOrdersProps {
  orders: OrderIntent[];
  isLoading: boolean;
}

export default function TableOrders({ orders, isLoading }: TableOrdersProps) {
  const tokenList = useTokenList(true);

  const rows = useMemo(() => 
    orders.map(({
      intentId,
      srcToken,
      srcAmount,
      dstToken,
      minReceived,
      expiration,
      status,
      batchId,
    }) => {
      const srcTokenIcon = getTokenIcon(srcToken, tokenList);
      const dstTokenIcon = getTokenIcon(dstToken, tokenList);
      const srcTokenSymbol = getSymbol(srcToken, tokenList);
      const dstTokenSymbol = getSymbol(dstToken, tokenList);
      const srcAmountUi = getUiAmount(srcAmount, getDecimals(srcToken, tokenList) ?? 1);
      const minReceivedUi = getUiAmount(minReceived, getDecimals(dstToken, tokenList) ?? 1);
      const limitPrice = (minReceivedUi / srcAmountUi).toFixed(6);

      return (
        <Table.Tr key={intentId}>
          <Table.Td className="flex items-center">
            {srcTokenIcon && (
              <Image
                className="rounded-full"
                width={25}
                height={25}
                src={srcTokenIcon}
                alt={`${srcTokenSymbol} icon`}
              />
            )}
            <span className="ml-2">{srcAmountUi}</span>
            <span className="mx-1">{srcTokenSymbol}</span>
          </Table.Td>
          <Table.Td className="flex items-center">
            {dstTokenIcon && (
              <Image
                className="rounded-full"
                width={25}
                height={25}
                src={dstTokenIcon}
                alt={`${dstTokenSymbol} icon`}
              />
            )}
            <span className="ml-2">{minReceivedUi}</span>
            <span className="mx-1">{dstTokenSymbol}</span>
          </Table.Td>
          <Table.Td className="flex items-center">
            {limitPrice} {dstTokenSymbol}
          </Table.Td>
          <Table.Td>
            {format(fromUnixTime(expiration), "MMM dd yyyy HH:mm")}
          </Table.Td>
          <Table.Td>
            <div
              className={`rounded-2xl max-w-20 text-center border-0 text-white ${status === "open" ? "bg-black-medium" : "bg-black"}`}
              aria-label={`Order status: ${status}`}
            >
              {status}
            </div>
          </Table.Td>
          <Table.Td>
            {batchId && (
              <a
                href={`https://swap.barkprotocol.dev.vercel.app/batches/${batchId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
                aria-label={`Batch ${batchId} details`}
              >
                <span className="material-symbols-rounded">stadium</span>
                <span className="material-symbols-rounded text-[14px] ml-2">open_in_new</span>
              </a>
            )}
          </Table.Td>
        </Table.Tr>
      );
    }), [orders, tokenList]);

  return (
    <Fragment>
      <Table.ScrollContainer minWidth={800}>
        <Table highlightOnHover verticalSpacing="md">
          <Table.Thead>
            <Table.Tr className="text-lg">
              <Table.Th>Sell</Table.Th>
              <Table.Th>Receive</Table.Th>
              <Table.Th>Limit Price</Table.Th>
              <Table.Th>Expiration</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Arena</Table.Th>
            </Table.Tr>
          </Table.Thead>
          {orders.length && !isLoading ? (
            <Table.Tbody>{rows}</Table.Tbody>
          ) : (
            isLoading && (
              <Table.Tbody>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Table.Tr key={index}>
                    <Table.Td colSpan={6}>
                      <Skeleton height={36} radius="xl" />
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            )
          )}
        </Table>
      </Table.ScrollContainer>
    </Fragment>
  );
}
