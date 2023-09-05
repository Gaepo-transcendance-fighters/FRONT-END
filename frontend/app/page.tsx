"use client";

import Layout from "@/components/public/Layout";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ModalPortal } from "@/components/public/ModalPortal";
import { useModalContext } from "@/context/ModalContext";
import InviteGame from "@/components/main/InviteGame/InviteGame";

export default function HomePage() {
  const router = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
    router.replace("/login");
  }, []);

  return null;
}
