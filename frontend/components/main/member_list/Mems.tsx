"use client";

import Member from "./Member";
import { IChatRoom } from "../room_list/RoomTypeButton";
import "@/components/main/member_list/MemberList.css";

export default function PtcptList({ aRoom }: { aRoom: IChatRoom | undefined }) {
  return (
    <div className="pllist">
      <div>
        {aRoom?.members.map((person, idx) => (
          <div key={idx}>
            <Member idx={idx} person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
