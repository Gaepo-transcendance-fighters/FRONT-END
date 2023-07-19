"use client";

import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import "@/components/main/mem_list/MemList.css";

export default function Mem({
  idx,
  person,
}: {
  idx: number;
  person: string;
}) {
  return (
    <div key={idx} className="plbtn">
      <div className="img">
        <Image src="/seal.png" alt="profile" width={53} height={53} />
      </div>
      <div className="name">{person}</div>
      <div className="icon">
        <StarIcon sx={{ height: "15px", color: "yellow" }} />
      </div>
    </div>
  );
}
