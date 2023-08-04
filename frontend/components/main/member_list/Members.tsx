"use client";

import Member from "./Member";
import { IChatRoom0 } from "@/components/public/Layout";
import "@/components/main/member_list/MemberList.css";
import { useRoom } from "@/context/RoomContext";

// export default function Members({ aRoom }: { aRoom: IChatRoom0 | undefined }) {
export default function Members() {
  const { roomState } = useRoom();
  return (
    <div className="memlist">
      <div>
        {roomState.currentRoomMember.map((person, idx) => (
          <div key={idx}>
            <Member idx={idx} person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
