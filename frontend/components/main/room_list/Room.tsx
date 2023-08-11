import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useEffect, useState, useRef } from "react";
import ProtectedModal from "./ProtectedModal";
import { useRoom } from "@/context/RoomContext";
import { IChatRoom0, Mode } from "@/context/RoomContext";
import { socket } from "@/app/layout";

export default function Room({ room, idx }: { room: IChatRoom0; idx: number }) {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState<boolean>(false);
  const statusCode = useRef(0);
  const pwRef = useRef("");
  const { roomState, roomDispatch } = useRoom();

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
    roomState.currentRoom
      ? roomDispatch({ type: "SET_ISOPEN", value: true })
      : null;
  };

  useEffect(() => {
    const ChatEnter = (json: any) => {
      console.log("json : ", json);
      roomDispatch({ type: "SET_CUR_MEM", value: json.member });
      //channelIdx 안보내줘도 될듯?
    };
    socket.on("chat_enter", ChatEnter);

    return () => {
      socket.off("chat_enter", ChatEnter);
    };
  }, []);

  const RoomClick = (room: IChatRoom0) => {
    socket.emit(
      "chat_enter",
      {
        userNickname: "intra_id",
        userIdx: 3,
        channelIdx: room.channelIdx,
        password: pwRef.current,
      },
      (statusCode: number) => {
        //   if (statusCode가 정상) {
        if (room.mode === Mode.PROTECTED) handleOpen();
        else {
          if (roomState.currentRoom !== room) {
            roomDispatch({ type: "SET_CURRENTROOM", value: room });
          }
          roomDispatch({ type: "SET_ISOPEN", value: true });
        }
        //   }
      }
    );
  };

  return (
    <>
      <>
        <button key={idx} className="item" onClick={() => RoomClick(room)}>
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
      </>
      <ProtectedModal
        open={open}
        handleClose={handleClose}
        statusCode={statusCode}
        room={room}
        fail={fail}
        setFail={setFail}
        pwRef={pwRef}
      />
    </>
  );
}
