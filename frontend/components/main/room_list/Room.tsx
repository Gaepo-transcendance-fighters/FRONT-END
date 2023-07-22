import { IChatRoom } from "./RoomTypeButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Dispatch, SetStateAction } from "react";

export default function Room({
  room,
  idx,
  setARoom,
  setIsRight,
  handleOpen2,
  setShowMembersList, //   RoomClick,
}: {
  room: IChatRoom;
  idx: number;
  setARoom: Dispatch<SetStateAction<IChatRoom | undefined>>;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  handleOpen2: () => void;
  setShowMembersList: Dispatch<SetStateAction<boolean>>;
  //   RoomClick: (room: IChatRoom) => void;
}) {
  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };

  const RoomClick = (room: IChatRoom) => {
    setARoom(room);
    room.password == "" ? setIsRight(true) : handleOpen2();
    setShowMembersList(false);
  };

  return (
    <button key={idx} className="item" onClick={() => RoomClick(room)}>
      <div className="roomidx">{leftPadding(room.channelIdx)}</div>
      <div className="owner">{room.owner}'s</div>
      <div className="lock">
        {room.password ? (
          <LockRoundedIcon sx={{ height: "13px", color: "#afb2b3" }} />
        ) : (
          ""
        )}
      </div>
    </button>
  );
}
