"use client";

import Stack from "./RoomNameStack";
import Typography from "@mui/material/Typography";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import "./RoomTitleField.css";
import { IconButton } from "@mui/material";
import SettingIconButton from "./SettingIconButton";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IChatRoom } from "@/type/type";
import { useRoom } from "@/context/RoomContext";
import { Dispatch, SetStateAction } from "react";
import { socket } from "@/app/page";
import { useUser } from "@/context/UserContext";
import { IChat } from "../ChatWindow";

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
  const { userState } = useUser();

  const updateChannels = (
    targetChannelIdx: number,
    updatedChannel: IChatRoom
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
    // console.log("[RoomTItleField] before updateChanels : " + roomState.nonDmRooms);
    roomDispatch({ type: "SET_NON_DM_ROOMS", value: updatedArray });
  };

  useEffect(() => {
    const leaveHandler = (channel: IChatRoom) => {
      console.log(
        "[RoomTItleField] receive from chat_goto_lobby API : " + channel
      );
      if (roomState.currentRoom) {
        updateChannels(roomState.currentRoom?.channelIdx, channel);
        roomDispatch({ type: "SET_IS_OPEN", value: false });
        roomDispatch({ type: "SET_CUR_ROOM", value: null });
      } else
        console.log("[RoomTItleField] there isn't roomState.currentRoom case");
    };
    const leaveAndDeleteHandler = (channels: IChatRoom[]) => {
      console.log(
        "[RoomTItleField] leaveAndDeleteHandler on! chanel : ",
        channels
      );
      if (roomState.currentRoom) {
        roomDispatch({ type: "SET_IS_OPEN", value: false });
        roomDispatch({ type: "SET_CUR_ROOM", value: null });
        roomDispatch({ type: "SET_NON_DM_ROOMS", value: channels });
      } else
        console.log("[RoomTItleField] there isn't roomState.currentRoom case");
    };
    socket.on("chat_goto_lobby", leaveHandler);
    socket.on("BR_chat_room_delete", leaveAndDeleteHandler);

    return () => {
      socket.off("chat_goto_lobby", leaveHandler);
      socket.off("BR_chat_room_delete", leaveAndDeleteHandler);
    };
  });

  useEffect(() => {
    console.log(
      "[RoomTItleField] show current nonDmchannels has been changed : ",
      roomState.nonDmRooms
    );
  }, [roomState.nonDmRooms]);

  useEffect(() => {
    console.log("userState.nickname : " + userState);
  }, [userState.nickname]);

  const leaveRoom = () => {
    const payload = {
      channelIdx: roomState.currentRoom?.channelIdx,
      userIdx: userState.userIdx, // [작업필요] 추후 나의 userIdx로 교체필요
    };
    socket.emit("chat_goto_lobby", JSON.stringify(payload));
    console.log("[RoomTItleField] click leaveroom");
  };

  return (
    <div className="room_title_field">
      <div className="room_title_field_left">
        <Stack />
        <div className="room_name">
          {
            <Typography variant="h4">
              {roomState.currentRoom?.mode === "private"
                ? userState.nickname + "'s room"
                : roomState.currentRoom?.owner + "'s room"}
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
