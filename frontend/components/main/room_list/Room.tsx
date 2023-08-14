"use client";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import { useEffect, useState, useRef } from "react";
import ProtectedModal from "./ProtectedModal";
import { useRoom } from "@/context/RoomContext";
import { IChatRoom0, Mode } from "@/context/RoomContext";
import { chatSocket } from "@/app/page";

export default function Room({ room, idx }: { room: IChatRoom0; idx: number }) {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState<boolean>(false);
  const statusCode = useRef(0);
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
      roomDispatch({ type: "SET_CUR_MEM", value: json.member });
      //channelIdx 안보내줘도 될듯?
    };
    chatSocket.on("chat_enter", ChatEnter);

    return () => {
      chatSocket.off("chat_enter", ChatEnter);
    };
  }, []);

  const RoomClick = (room: IChatRoom0) => {
    if (room.mode !== Mode.PROTECTED) {
      chatSocket.emit(
        "chat_enter",
        JSON.stringify({
          userNickname: "intra_id",
          userIdx: 3,
          channelIdx: room.channelIdx,
        }),
        (statusCode: number) => {
          if (statusCode === 200) {
            if (roomState.currentRoom !== room) {
              roomDispatch({ type: "SET_CURRENTROOM", value: room });
            }
            roomDispatch({ type: "SET_ISOPEN", value: true });
          }
        }
      );
    } else {
      handleOpen();
    }
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
        room={room}
        fail={fail}
        setFail={setFail}
      />
    </>
  );
}
