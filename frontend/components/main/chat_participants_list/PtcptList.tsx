"use client";

import "@/components/main/chat_participants_list/ChatPtcptsList.css";
import Ptcpt from "./Ptcpt";
import { IChatRoom } from "../room_list/RoomTypeButton";

export default function PtcptList({ aRoom }: { aRoom: IChatRoom | undefined }) {
  return (
    <div className="pllist">
      <div>
        {aRoom?.Ptcpts.map((person, idx) => (
          <div key={idx}>
            <Ptcpt idx={idx} person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
