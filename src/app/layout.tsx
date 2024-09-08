import "./globals.css";
import "./material-symbols.css";
// import "splitting/dist/splitting.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { Metadata, Viewport } from "next";
import { dm_sans, red_hat_display } from "./fonts/config";

import { GoogleAnalytics } from "@next/third-parties/google";

import AppWalletProvider from "@/components/wallet-connect/WalletProvider";
import { ColorSchemeScript } from "@mantine/core";
import MantineThemeProvider from "@/components/theme/MantineThemeProvider";
import { Notifications } from "@mantine/notifications";
import React from "react";

export const metadata: Metadata = {
  title: "Trade Different with BARK",
  description: "Trade Different with BARK",
  icons: {
    icon: "https://ucarecdn.com/f242e5dc-8813-47b4-af80-6e6dd43945a9/barkicon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

const notificationClasses = {
  notification: "bg-black",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dm_sans.variable}>
      <head>
        <ColorSchemeScript />
        <GoogleAnalytics gaId="YOUR_GOOGLE_ANALYTICS_ID" /> {/* Replace with your Google Analytics ID */}
      </head>
      <body className={red_hat_display.variable}>
        <MantineThemeProvider>
          <Notifications
            autoClose={5000}
            position="bottom-right"
            classNames={notificationClasses}
          />
          <AppWalletProvider>{children}</AppWalletProvider>
        </MantineThemeProvider>
      </body>
    </html>
  );
}
