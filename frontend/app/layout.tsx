"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style.css";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={font}>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <div
              style={{
                backgroundImage: `url("/background.png")`,
                width: "100%",
                backgroundRepeat: "repeat",
                height: "100vh",
              }}
            >
              {children}
            </div>
          </body>
        </html>
      </AuthProvider>
    </ThemeProvider>
  );
}
