"use client";

import Member from "./Member";
import { IChatRoom0 } from "@/components/public/Layout";
import "@/components/main/member_list/MemberList.css";

export default function Members({ aRoom }: { aRoom: IChatRoom0 | undefined }) {
  return (
    <div className="memlist">
      <div>
        {aRoom?.mems.map((person, idx) => (
          <div key={idx}>
            <Member idx={idx} person={person} />
          </div>
        ))}
      </div>
    </div>
  );
}
