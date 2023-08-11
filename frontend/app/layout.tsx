"use client";

import { Inter } from "next/font/google";
import "@/app/style.css";
import { AuthProvider } from "@/context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { RoomProvider } from "@/context/RoomContext";
import { io } from "socket.io-client";
import { FriendProvide } from "@/context/FriendContext";
import { GameProvider } from "@/context/GameContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
const userId = 3;
// export const socket = io("http://localhost:4000/chat");
export const socket = io("http://localhost:4000/chat", {
  query: { userId: userId },
});

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
        <GameProvider>
        <RoomProvider>
          <FriendProvide>
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
          </FriendProvide>
        </RoomProvider>
        </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
