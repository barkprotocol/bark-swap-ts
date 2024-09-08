"use server";

import { EnvProvider } from "@/components/layout/EnvProvider";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { SwapProvider } from "@/components/trade/swap/SwapProvider";
import SwapWidget from "@/components/layout/SwapWidget";

async function fetchEnvVars() {
  try {
    return {
      heliusApiKey: process.env.HELIUS_API_KEY,
      protocolProgramIdPubkey: process.env.PROTOCOL_PROGRAM_ID_PUBLIC_KEY,
      nonceAuthorityAccountSecretKey:
        process.env.NONCE_AUTHORITY_ACCOUNT_SECRET_KEY,
      nonceAuthorityAccountPubkey: process.env.NONCE_AUTHORITY_ACCOUNT_PUBLIC_KEY,
      nonceAccountPubkey: process.env.NONCE_ACCOUNT_PUBLIC_KEY,
      nonceAccountSecretKey: process.env.NONCE_ACCOUNT_SECRET_KEY,
    };
  } catch (error) {
    console.error("Error fetching environment variables:", error);
    throw new Error("Unable to load environment variables.");
  }
}

export default async function Home() {
  let env;

  try {
    env = await fetchEnvVars();
  } catch (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to load application. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main className="flex items-center justify-center">
        <EnvProvider env={env}>
          <SwapProvider>
            <SwapWidget />
          </SwapProvider>
        </EnvProvider>
      </main>
      <Footer />
    </div>
  );
}
