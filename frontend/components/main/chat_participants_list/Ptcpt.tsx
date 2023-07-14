import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import "@/components/main/chat_participants_list/ChatPtcptsList.css";

export default function Ptcpt({ person }: { person: string }) {
  return (
    <div className="plbtn">
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
