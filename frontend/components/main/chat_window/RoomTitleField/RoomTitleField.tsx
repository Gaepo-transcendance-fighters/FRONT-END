"use client";

import Stack from "../Stack";
import Typography from "@mui/material/Typography";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import "./RoomTitleField.css";
import { Box, Modal, Button, IconButton } from "@mui/material";
import SettingIconButton from "./SettingIconButton";
import { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Dispatch, SetStateAction } from "react";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RoomTitleField = ({
  setFunction,
}: {
  setFunction: Dispatch<SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const leaveRoom = () => {
    setFunction(false);
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