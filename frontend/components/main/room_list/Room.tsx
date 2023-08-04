import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ProtectedModal from "./ProtectedModal";
import { IChatRoom0, IMember, Mode } from "@/components/public/Layout";
import { useRoom } from "@/context/RoomContext";
import { mockMemberList0 } from "@/components/public/Layout";

export default function Room({
  room,
  idx,
  setARoom,
  setIsRight,
  isRight,
  aRoom,
}: {
  room: IChatRoom0;
  idx: number;
  setARoom: Dispatch<SetStateAction<IChatRoom0 | undefined>>;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  isRight: boolean;
  aRoom: IChatRoom0 | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState<boolean>(false);
  const [memberList, setMemberList] = useState<IMember[]>([]);
  const { setIsOpen } = useRoom();

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
    aRoom ? setIsOpen(true) : null;
  }; // 올바른 비번

  /*
  {
    member[] {
      member {
        nickname : string, 
        imgUri : string,
        permission : enum
      },
      ...
    },
    channelIdx : number
  }*/
  // useEffect(() => {
  //   const ChatEnter = (json) => {
  //     setMemberList(json.member);
  //     //channelIdx 저장. > 이 데이터 주전님이 써야함
  //   };
  //   socket.on("chat_enter", ChatEnter, json);

  //   return () => {
  //     socket.off("chat_enter", ChatEnter, json);
  //   };
  // }, []);
  const RoomClick = (room: IChatRoom0) => {
    // room.password || aRoom === room ? null : setARoom(room);
    // room.password == "" ? setIsRight(true) : handleOpen();
    // socket.emit("chat_enter", { roomId: room.channelIdx }, 상태코드);
    // if (정상상태코드) {
    //   room.mode === Mode.PROTECTED || aRoom === room ? null : setARoom(room);
    //   room.mode !== Mode.PROTECTED ? setIsRight(true) : handleOpen();
    // }
    // room.mode !== Mode.PROTECTED ? setMemberList(mockMemberList0) : null;
  };
  const RightClick = (e: any) => {
    e.preventDefault();
    console.log("mouse right click!", e.type);
  };

  return (
    <>
      <button
        key={idx}
        className="item"
        onClick={() => RoomClick(room)}
        onContextMenu={(e) => RightClick(e)}
      >
        <div className="roomidx">{leftPadding(room.channelIdx)}</div>
        <div className="owner">{room.owner}'s</div>
        <div className="lock">
          {room.mode === Mode.PROTECTED ? (
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
