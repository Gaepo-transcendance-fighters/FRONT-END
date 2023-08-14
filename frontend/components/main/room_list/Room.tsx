"use client";

import { useEffect, useState, useRef } from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ProtectedModal from "./ProtectedModal";
import {
  IChatEnter,
  IChatEnterNoti,
  alert,
  useRoom,
} from "@/context/RoomContext";
import { IChatRoom0, Mode } from "@/context/RoomContext";
import { socket } from "@/app/page";
import Alert from "@mui/material/Alert";

export default function Room({ room, idx }: { room: IChatRoom0; idx: number }) {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [newMem, setNewMem] = useState("");
  const { roomState, roomDispatch } = useRoom();

  useEffect(() => {
    const ChatEnterNoti = (data: IChatEnterNoti) => {
      setShowAlert(true);
      setNewMem(data.newMember);
    };
    socket.on("chat_enter_noti", ChatEnterNoti);

    return () => {
      socket.off("chat_enter_noti", ChatEnterNoti);
    };
  }); // TODO : 위치?

  useEffect(() => {
    if (showAlert) {
      const time = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(time);
    }
  }, [showAlert]);

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
    const ChatEnter = (json: IChatEnter) => {
      roomDispatch({ type: "SET_CUR_MEM", value: json.member });
      //channelIdx 안보내줘도 될듯?
    };
    socket.on("chat_enter", ChatEnter);

    return () => {
      socket.off("chat_enter", ChatEnter);
    };
  }, []);

  useEffect(() => {
    const ChatDmEnter = (json: any) => {
      roomDispatch({
        type: "SET_CUR_DM_MEM",
        value: {
          userIdx1: json.userIdx1,
          userIdx2: json.userIdx2,
          userNickname1: json.userNickname1,
          userNickname2: json.userNickname2,
          imgUrl: json.imgUrl,
        },
      });
    };
    socket.on("check_dm", ChatDmEnter);

    return () => {
      socket.off("check_dm", ChatDmEnter);
    };
  }, []);

  const RoomClick = (room: IChatRoom0) => {
    if (room.mode !== Mode.PROTECTED) {
      if (room.mode === Mode.PRIVATE) {
        socket.emit(
          "chat_get_DM",
          JSON.stringify({
            channelIdx: room.channelIdx,
          }),
          (json: any) => {
            // 아직 안정해짐
            if (roomState.currentRoom !== room) {
              roomDispatch({ type: "SET_CURRENTROOM", value: room });
            }
            roomDispatch({ type: "SET_ISOPEN", value: true });
          }
        );
      } else {
        socket.emit(
          "chat_enter",
          JSON.stringify({
            userNickname: "hoslim",
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
      }
    } else {
      handleOpen();
    }
  };

  return (
    <>
      <button key={idx} className="item" onClick={() => RoomClick(room)}>
        <div className="roomidx">{leftPadding(room.channelIdx)}</div>
        <div className="owner">
          {room.owner ? room.owner : room.targetNickname}'s
        </div>
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
        room={room}
        fail={fail}
        setFail={setFail}
      />
      {showAlert ? (
        <Alert sx={alert} severity="info" style={{ width: "333px" }}>
          {newMem} has joined
        </Alert>
      ) : null}
    </>
  );
}
