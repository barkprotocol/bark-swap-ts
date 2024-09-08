"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";

// Define your custom theme with radius and gradient background
const theme = createTheme({
  radius: {
    lg: "0.5rem",
    xl: "0.75rem",
  },
  defaultRadius: "xl",
  other: {
    backgroundGradient:
      "linear-gradient(287deg, rgba(193,255,255,1) 0%, rgba(227,224,237,1) 25%, rgba(189,179,210,1) 65%, rgba(227,224,237,1) 100%)",
  },
});

// Define a custom CSS variables resolver function
const resolver = (theme: typeof theme) => ({
  variables: {},
  dark: {},
  light: {
    "--mantine-color-body": theme.other.backgroundGradient,
  },
});

export default function MantineThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider>
  );
}
