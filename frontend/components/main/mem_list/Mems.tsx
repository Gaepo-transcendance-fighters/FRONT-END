"use client";

import Mem from "./Mem";
import { IChatRoom } from "../room_list/RoomTypeButton";
import "@/components/main/mem_list/MemList.css";

export default function PtcptList({ aRoom }: { aRoom: IChatRoom | undefined }) {
  return (
    <div className="pllist">
      <div>
        {aRoom?.Ptcpts.map((person, idx) => (
          <div key={idx}>
            <Mem idx={idx} person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
