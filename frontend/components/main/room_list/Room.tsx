import { IChatRoom } from "./RoomTypeButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProtectedModal from "./ProtectedModal";

export default function Room({
  room,
  idx,
  setARoom,
  setIsRight,
  setShowMembersList,
  isRight,
  aRoom,
}: {
  room: IChatRoom;
  idx: number;
  setARoom: Dispatch<SetStateAction<IChatRoom | undefined>>;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  setShowMembersList: Dispatch<SetStateAction<boolean>>;
  isRight: boolean;
  aRoom: IChatRoom | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState<boolean>(false);

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFail(false);
    setShowMembersList(true);
  }; // 올바른 비번
  
  const RoomClick = (room: IChatRoom) => {
    room.password || aRoom === room ? null : setARoom(room);
    room.password == "" ? setIsRight(true) : handleOpen();
  };

  return (
    <>
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
      <ProtectedModal
        open={open}
        handleClose={handleClose}
        isRight={isRight}
        setIsRight={setIsRight}
        room={room}
        fail={fail}
        setFail={setFail}
        setARoom={setARoom}
      />
    </>
  );
}
