"use client";

import { Inter } from "next/font/google";
import "@/app/style.css";
import { AuthProvider } from "@/context/AuthContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { RoomProvider } from "@/context/RoomContext";
import { FriendProvide } from "@/context/FriendContext";
import { GameProvider } from "@/context/GameContext";
import { UserProvider } from "@/context/UserContext";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={font}>
      <AuthProvider>
        <UserProvider>
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
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
