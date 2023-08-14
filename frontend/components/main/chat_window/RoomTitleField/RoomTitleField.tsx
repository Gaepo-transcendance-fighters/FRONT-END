"use client";

import Stack from "./RoomNameStack";
import Typography from "@mui/material/Typography";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import "./RoomTitleField.css";
import { IconButton } from "@mui/material";
import SettingIconButton from "./SettingIconButton";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IChatRoom0, useRoom } from "@/context/RoomContext";
import { Dispatch, SetStateAction } from "react";
import { socket } from "@/app/page";

export interface IChatRoom {
  roomName: string;
  isProtected: boolean;
}

interface IChat {
  channelIdx: number;
  senderIdx: number;
  msg: string;
  msgDate: Date;
}
interface Props {
  setMsgs: Dispatch<SetStateAction<IChat[]>>;
}
export enum Mode {
  PRIVATE = "private",
  PUBLIC = "public",
  PROTECTED = "protected",
}

const RoomTitleField = ({ setMsgs }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { roomState, roomDispatch } = useRoom();

  const updateChannels = (
    targetChannelIdx: number,
    updatedChannel: IChatRoom0
  ) => {
    const updatedArray = roomState.nonDmRooms.map((item) => {
      if (item.channelIdx === targetChannelIdx) {
        return {
          ...item,
          owner: updatedChannel.owner,
        };
      }
      return item;
    });
    console.log(roomState.nonDmRooms);
    roomDispatch({ type: "SET_NON_ROOMS", value: updatedArray });
  };

  useEffect(() => {
    const leaveHandler = (channel: IChatRoom0) => {
      console.log(channel);
      if (roomState.currentRoom) {
        updateChannels(roomState.currentRoom?.channelIdx, channel);
        roomDispatch({ type: "SET_ISOPEN", value: false });
        roomDispatch({ type: "SET_CURRENTROOM", value: null });
      }
    };
    socket.on("chat_goto_lobby", leaveHandler);
    console.log("recieve from server");
  });

  const leaveRoom = () => {
    const payload = {
      channelIdx: roomState.currentRoom?.channelIdx,
      userIdx: 3, // [작업필요] 추후 나의 userIdx로 교체필요
    };
    socket.emit("chat_goto_lobby", payload);
    console.log("click leaveroom");
  };

  return (
    <div className="room_title_field">
      <div className="room_title_field_left">
        <Stack />
        <div className="room_name">
          {
            <Typography variant="h4">
              {roomState.currentRoom?.owner + "'s room"}
            </Typography>
          }
        </div>
      </div>
      <div className="room_title_field_right">
        <div className="room_type">
          {roomState.currentRoom?.mode === "protected" ? (
            <VpnKeyTwoToneIcon />
          ) : null}
        </div>
        <div className="room_setting">
          <SettingIconButton />
        </div>
        <div className="room_exit">
          <IconButton aria-label="leave room" onClick={leaveRoom}>
            <DeleteForeverIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default RoomTitleField;
