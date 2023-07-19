"use client";

import "@/components/main/room_list/RoomList.css";
import "@/components/main/mem_list/MemList.css";

export default function Title({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return <div className={title}>{text}</div>;
}
