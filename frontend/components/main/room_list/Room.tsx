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
  lock,
  clickedLock,
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
      console.log("ChatEnter : ", json);
      roomDispatch({ type: "SET_CUR_MEM", value: json.member });
      roomDispatch({ type: "SET_ADMIN_ARY", value: json.admin });
      //channelIdx 안보내줘도 될듯?
    };
    socket.on("chat_enter", ChatEnter);

    return () => {
      socket.off("chat_enter", ChatEnter);
    };
  }, []);

  useEffect(() => {
    const ChatDmEnter = (json: IChatDmEnter) => {
      console.log("ChatDmEnter");
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
    socket.on("chat_get_DM", ChatDmEnter);

    return () => {
      socket.off("chat_get_DM", ChatDmEnter);
    };
  }, []);

  //TODO : 0명 되는 경우

  useEffect(() => {
    // const GoToLobby = (json?: IChatRoom[]) => {
    const GoToLobby = (json: IChatRoom[]) => {
      console.log("GoToLobby : ", json);
      roomDispatch({ type: "SET_NON_DM_ROOMS", value: json });
    };
    socket.on("chat_goto_lobby", GoToLobby);

    return () => {
      socket.off("chat_goto_lobby", GoToLobby);
    };
  }, []);

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
              if (json === 200) {
                console.log("dm click");
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

  console.log("adminAry : ", roomState.adminAry);
  return (
    <>
      <button
        key={idx}
        className={
          roomState.currentRoom?.channelIdx === room.channelIdx
            ? "clickeditem"
            : "item"
        }
        onClick={() => RoomClick(room)}
      >
        <div
          className={
            roomState.currentRoom?.channelIdx === room.channelIdx
              ? "clickedroomidx"
              : "roomidx"
          }
        >
          {leftPadding(room.channelIdx)}
        </div>
        <div className="owner">
          {room.owner ? room.owner : room.targetNickname}'s
        </div>
        <div className="lock">
          {room.mode === Mode.PROTECTED ? (
            <LockRoundedIcon
              sx={
                roomState.currentRoom?.channelIdx === room.channelIdx
                  ? clickedLock
                  : lock
              }
            />
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
