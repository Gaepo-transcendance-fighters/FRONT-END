"use client";

import Stack from "./RoomNameStack";
import Typography from "@mui/material/Typography";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import "./RoomTitleField.css";
import { IconButton } from "@mui/material";
import SettingIconButton from "./SettingIconButton";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useRoom } from "@/context/RoomContext";

export interface IChatRoom {
  roomName: string;
  isProtected: boolean;
}

const mockChatRoomList: IChatRoom[] = [
  {
    roomName: "jujeon room",
    isProtected: true,
  },
  {
    roomName: "silee room",
    isProtected: false,
  },
  {
    roomName: "jeekim room",
    isProtected: false,
  },
  {
    roomName: "hoslim room",
    isProtected: true,
  },
];

const RoomTitleField = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { roomDispatch } = useRoom();

  const leaveRoom = () => {
    roomDispatch({ type: "SET_ISOPEN", value: false });
  };

  return (
    <div className="room_title_field">
      <div className="room_title_field_left">
        <Stack />
        <div className="room_name">
          {<Typography variant="h4">{mockChatRoomList[0].roomName}</Typography>}
        </div>
      </div>
      <div className="room_title_field_right">
        <div className="room_type">
          {mockChatRoomList[0].isProtected ? <VpnKeyTwoToneIcon /> : null}
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
