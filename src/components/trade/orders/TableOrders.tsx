"use client";

import { Fragment, useMemo } from "react";
import { format, fromUnixTime } from "date-fns";
import { getDecimals, getSymbol, getTokenIcon, getUiAmount } from "@/lib/utils";

import Image from "next/image";
import { Skeleton, Table } from "@mantine/core";
import { useTokenList } from "@/hooks/useTokenList";

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

  const rows = useMemo(
    () =>
      orders.map(
        ({
          intentId,
          srcToken,
          srcAmount,
          dstToken,
          minReceived,
          expiration,
          status,
          batchId,
        }) => {
          const srcIcon = getTokenIcon(srcToken, tokenList);
          const dstIcon = getTokenIcon(dstToken, tokenList);
          const srcDecimals = getDecimals(srcToken, tokenList) ?? 1;
          const dstDecimals = getDecimals(dstToken, tokenList) ?? 1;
          const srcSymbol = getSymbol(srcToken, tokenList);
          const dstSymbol = getSymbol(dstToken, tokenList);
          const limitPrice =
            getUiAmount(minReceived, dstDecimals) /
            getUiAmount(srcAmount, srcDecimals);

          return (
            <Table.Tr key={intentId}>
              <Table.Td className="flex">
                {srcIcon && (
                  <Image
                    className="rounded-full"
                    width={25}
                    height={25}
                    src={srcIcon}
                    alt={`${srcSymbol} icon`}
                  />
                )}
                <span className="ml-2">
                  {getUiAmount(srcAmount, srcDecimals)}
                </span>
                <span className="mx-1">{srcSymbol}</span>
              </Table.Td>
              <Table.Td className="flex">
                {dstIcon && (
                  <Image
                    className="rounded-full"
                    width={25}
                    height={25}
                    src={dstIcon}
                    alt={`${dstSymbol} icon`}
                  />
                )}
                <span className="ml-2">
                  {getUiAmount(minReceived, dstDecimals)}
                </span>
                <span className="mx-1">{dstSymbol}</span>
              </Table.Td>
              <Table.Td>
                <div className="flex">
                  1 {srcSymbol} = {limitPrice.toFixed(6)} {dstSymbol}
                </div>
              </Table.Td>
              <Table.Td>
                <div className="flex">
                  {format(fromUnixTime(expiration), "MMM dd yyyy HH:mm")}
                </div>
              </Table.Td>
              <Table.Td>
                <div
                  className={`rounded-2xl max-w-20 text-center border-0 text-cream ${
                    status === "open" ? "bg-black-medium" : "bg-black"
                  }`}
                >
                  {status}
                </div>
              </Table.Td>
              <Table.Td>
                {batchId && (
                  <a
                    href={`https://arena.barkrotocol.vercel.app/batches/${batchId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <span className="material-symbols-rounded align-center">
                      stadium
                    </span>
                    <span className="material-symbols-rounded align-top text-[14px] ml-2">
                      open_in_new
                    </span>
                  </a>
                )}
              </Table.Td>
            </Table.Tr>
          );
        },
      ),
    [tokenList, orders],
  );

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
          ) : null}
        </Table>
      </Table.ScrollContainer>
      {isLoading &&
        Array.from({ length: 6 }).map((_, index) => (
          <div className="m-4" key={index}>
            <Skeleton height={36} radius="sm" />
          </div>
        ))}
    </Fragment>
  );
}
