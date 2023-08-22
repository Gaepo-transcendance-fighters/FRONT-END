"use client";

import { Inter } from "next/font/google";
import "@/app/style.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { RoomProvider } from "@/context/RoomContext";
import { FriendProvider } from "@/context/FriendContext";
import { GameProvider } from "@/context/GameContext";
import { UserProvider } from "@/context/UserContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { io } from "socket.io-client";
import { use, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
//TODO : useridx 바뀌었을때도 테스트하고 적용하기, main_chat_3

const font = createTheme({
  typography: {
    fontFamily: "neodgm",
  },
});

const userId =
  typeof window !== "undefined" ? localStorage.getItem("idx") : null;

// export const socket = io("http://localhost:4000/chat", {
// haryu's server
export const socket = io("http://paulryu9309.ddns.net:4000/chat", {
  query: { userId: userId },
});

export const gameSocket = io("http://paulryu9309.ddns.net:4000/game", {
  query: { userId: userId },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authDispatch } = useAuth();

  useEffect(() => {
    if (!userId) return;
    authDispatch({ type: "SET_ID", value: parseInt(userId) });
  }, []);

  // useRequireAuth();

  return (
    <ThemeProvider theme={font}>
      <AuthProvider>
        <UserProvider>
          <GameProvider>
            <RoomProvider>
              <FriendProvider>
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
              </FriendProvider>
            </RoomProvider>
          </GameProvider>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
