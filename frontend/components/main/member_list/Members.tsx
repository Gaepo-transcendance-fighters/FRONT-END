"use client";

import Member from "./Member";
import "@/components/main/member_list/MemberList.css";
import { useRoom } from "@/context/RoomContext";

export default function Members() {
  const { roomState } = useRoom();
  return (
    <div className="memlist">
      <div>
        {roomState.currentRoomMemberList.map((person, idx) => (
          <div key={idx}>
            <Member idx={idx} person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
