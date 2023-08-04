"use client";

import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import "@/components/main/member_list/MemberList.css";
import { useState } from "react";
import MemberModal from "./MemberModal";
import { IMember } from "@/components/public/Layout";

export default function Member({
  idx,
  person,
}: {
  idx: number;
  person: IMember;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  
  return (
    <>
      <div key={idx} className="membtn" onClick={handleOpenModal}>
        <div className="memimg">
          <Image src="/seal.png" alt="profile" width={53} height={53} />
        </div>
        <div className="memname">{person.nickname}</div>
        <div className="memicon">
          <StarIcon sx={{ height: "15px", color: "yellow" }} />
        </div>
      </div>
      {/* <MemberModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        person={person}
      /> */}
    </>
  );
}
