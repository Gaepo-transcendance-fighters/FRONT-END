"use client";

import "@/components/main/chat_participants_list/ChatPtcptsList";
import "@/components/main/room_list/RoomList.css";

export default function Title({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return <div className={title}>{text}</div>;
}
