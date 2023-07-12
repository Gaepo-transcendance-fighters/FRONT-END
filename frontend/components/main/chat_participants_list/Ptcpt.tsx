import "@/components/main/chat_participants_list/ChatPtcptsList.css";
import Image from "next/image";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export default function Ptcpt({ person }: { person: string }) {
  return (
    <div className="plbtn">
      <div className="img">
        <Image src="/seal.png" alt="profile" width={63} height={63} />
      </div>
	  <div className="name">
		{person}
	  </div>
	  <div className="icon">
		<StarIcon sx={{ height: "15px", color : "yellow"}}/>
	  </div>
    </div>
  );
}
