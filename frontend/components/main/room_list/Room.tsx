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
  showMembersList,
  aRoom,
}: {
  room: IChatRoom;
  idx: number;
  setARoom: Dispatch<SetStateAction<IChatRoom | undefined>>;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  setShowMembersList: Dispatch<SetStateAction<boolean>>;
  isRight: boolean;
  showMembersList: boolean;
  aRoom: IChatRoom | undefined;
}) {
  const [open2, setOpen2] = useState(false);
  const [fail, setFail] = useState<boolean>(false);

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setFail(false);
    setShowMembersList(true);
  }; // 올바른 비번

  const handleClose3 = () => {
    setOpen2(false);
    setFail(false);
    setShowMembersList(true);
  };

  const RoomClick = (room: IChatRoom) => {
    room.password || aRoom === room ? null : setARoom(room);
    room.password == "" ? setIsRight(true) : handleOpen2();
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
        open2={open2}
        handleClose2={handleClose2}
        handleClose3={handleClose3}
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
