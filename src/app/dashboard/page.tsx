"use client";

import { useEffect, useState } from "react";
import BasicPage from "@/components/utils/BasicPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pagination } from "@mantine/core";
import TableOrders from "@/components/trade/orders/TableOrders";
import WalletConnectionButton from "@/components/wallet-connect/WalletConnectionButton";
import axios from "../api/axios";
import { useUnifiedWallet } from "@jup-ag/wallet-adapter";

// Type definitions
interface Order {
  id: string;
  // Add other properties of an order here
}

const PER_PAGE = 10;

// Function to chunk array into smaller arrays
function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) return [];
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

export default function ListOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activePage, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const { publicKey, connected } = useUnifiedWallet();

  useEffect(() => {
    if (!publicKey) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const { data } = await axios.get<Order[]>(
          `/orders?srcAddress=${publicKey.toString()}`
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders", error);
        setError("There was an error fetching your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [publicKey]);

  const paginatedOrders = chunk(orders, PER_PAGE);

  return (
    <BasicPage>
      {isLoading ? (
        <div className="text-center mt-12">
          <p>Loading orders...</p>
        </div>
      ) : error ? (
        <div className="text-center mt-12">
          <p className="text-red-500">{error}</p>
        </div>
      ) : !orders.length ? (
        <div className="text-center mt-12">
          <p>No orders found</p>
          {!connected && (
            <p className="font-bold text-lg mt-12">
              Please connect your wallet to view your orders
            </p>
          )}
        </div>
      ) : (
        <div className="my-10">
          <TableOrders
            orders={paginatedOrders[activePage - 1] ?? []}
            isLoading={isLoading}
          />
          <div className="my-8 flex justify-center">
            <Pagination
              total={paginatedOrders.length}
              value={activePage}
              onChange={setPage}
              color="#1a0d00"
              size="sm"
              radius="md"
            />
          </div>
        </div>
      )}

      <div className="mt-12 flex justify-end">
        {!connected ? (
          <WalletConnectionButton />
        ) : (
          <Link href="/">
            <Button variant="secondary">Create new order</Button>
          </Link>
        )}
      </div>
    </BasicPage>
  );
}
