"use client";

import { useEffect, useState, useRef } from "react";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import ProtectedModal from "./ProtectedModal";
import { useRoom } from "@/context/RoomContext";
import {
  IChatRoom,
  Mode,
  IChatDmEnter,
  IChatEnter,
  IChatEnterNoti,
  alert,
} from "@/type/type";
import { socket } from "@/app/page";
import Alert from "@mui/material/Alert";
import { useUser } from "@/context/UserContext";

export default function Room({ room, idx }: { room: IChatRoom; idx: number }) {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [newMem, setNewMem] = useState("");
  const { roomState, roomDispatch } = useRoom();
  const { userState } = useUser();

  useEffect(() => {
    const ChatEnterNoti = (data: IChatEnterNoti) => {
      setShowAlert(true);
      setNewMem(data.newMember);
    };
    socket.on("chat_enter_noti", ChatEnterNoti);

    return () => {
      socket.off("chat_enter_noti", ChatEnterNoti);
    };
  });

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
      ? roomDispatch({ type: "SET_IS_OPEN", value: true })
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
    const ChatDmEnter = (json: IChatDmEnter) => {
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

  //TODO : 0명 되는 경우

  // useEffect(() => {
  //   const GoToLobby = (json: IChatRoom[]) => {
  //     roomDispatch({ type: "SET_NON_DM_ROOMS", value: json });
  //   };
  //   socket.on("chat_goto_lobby", GoToLobby);

  //   return () => {
  //     socket.off("chat_goto_lobby", GoToLobby);
  //   };
  // }, []);

  const RoomClick = (room: IChatRoom) => {
    if (roomState.currentRoom !== room) {
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
                roomDispatch({ type: "SET_CUR_ROOM", value: room });
              }
              roomDispatch({ type: "SET_IS_OPEN", value: true });
            }
          );
        } else {
          socket.emit(
            "chat_enter",
            JSON.stringify({
              userNickname: userState.nickname,
              userIdx: userState.userIdx,
              channelIdx: room.channelIdx,
            }),
            (statusCode: number) => {
              if (statusCode === 200) {
                if (
                  roomState.currentRoom &&
                  roomState.currentRoom.mode !== Mode.PRIVATE
                ) {
                  socket.emit(
                    "chat_goto_lobby",
                    JSON.stringify({
                      channelIdx: roomState.currentRoom.channelIdx,
                      userIdx: userState.userIdx,
                    }),
                    (ret: any) => {
                      console.log("chat_goto_lobby ret : ", ret);
                    }
                  );
                }
                roomDispatch({ type: "SET_CUR_ROOM", value: room });
                roomDispatch({ type: "SET_IS_OPEN", value: true });
              }
            }
          );
        }
      } else {
        handleOpen();
      }
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
