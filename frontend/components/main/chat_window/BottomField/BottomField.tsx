"use client";

import { Box, Button } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { socket } from "@/app/page";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { useRoom } from "@/context/RoomContext";
import { IChat } from "../ChatWindow";
import { useUser } from "@/context/UserContext";

interface IPayload {
  channelIdx: number | undefined;
  senderIdx: number;
  msg: string;
  targetIdx: number | null;
}

interface Props {
  setMsgs: Dispatch<SetStateAction<IChat[]>>;
}
const BottomField = ({ setMsgs }: Props) => {
  const [msg, setMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { roomState } = useRoom();
  const { userState } = useUser();

  const changeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  useEffect(() => {
    const messageHandler = (chat: IChat) => {
      // console.log("서버로부터 내가보낸 메세지 수신");
      // console.log("chat", chat);
      if (roomState.currentRoom?.mode === "private") {
        setMsgs((prevChats: any) => [chat, ...prevChats]); // <----- any type 나중 변경 필요.
      } else {
        setMsgs((prevChats: any) => [...prevChats, chat]); // <----- any type 나중 변경 필요.
      }
      setMsg("");
    };
    socket.on("chat_send_msg", messageHandler);

    return () => {
      socket.off("chat_send_msg", messageHandler);
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      let payload: IPayload | undefined = undefined;
      if (
        roomState.currentRoom?.mode === "private" &&
        roomState.currentDmRoomMemberList?.userIdx1 &&
        roomState.currentDmRoomMemberList?.userIdx2
      ) {
        payload = {
          channelIdx: roomState.currentRoom?.channelIdx,
          senderIdx: 98029, // <-====================== 나중에 변경필요
          msg: msg,
          targetIdx:
            userState.userIdx === roomState.currentDmRoomMemberList?.userIdx1
              ? roomState.currentDmRoomMemberList?.userIdx2
              : roomState.currentDmRoomMemberList?.userIdx1, // <------------------ 현재 채널의 모든 사용자들의 인덱스를 알아야한다.
        };
      } else if (
        (roomState.currentRoom?.mode === "public" ||
          roomState.currentRoom?.mode === "protected") &&
        roomState.currentDmRoomMemberList?.userIdx1 &&
        roomState.currentDmRoomMemberList?.userIdx2
      ) {
        payload = {
          channelIdx: roomState.currentRoom?.channelIdx,
          senderIdx: 98029, // <-====================== 나중에 변경필요
          msg: msg,
          targetIdx:
            userState.userIdx === roomState.currentDmRoomMemberList?.userIdx1
              ? roomState.currentDmRoomMemberList?.userIdx2
              : roomState.currentDmRoomMemberList?.userIdx1, // <------------------ 현재 채널의 모든 사용자들의 인덱스를 알아야한다.
        };
      }
      // console.log("메세지 전송 눌렀을때 payload", payload);
      socket.emit("chat_send_msg", payload);
      inputRef.current?.focus();
    },
    [msg]
  );

  return (
    <Box
      sx={{
        marginBottom: 0,
        backgroundColor: "#4174D3",
        display: "flex",
        justifyContent: "center",
        margin: "0.5% 2% 2% 2%",
        borderRadius: "10px",
        minWidth: "260px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <FormControl>
            <OutlinedInput
              style={{
                backgroundColor: "#1e4ca9",
                height: "5%",
                width: "45vw",
                margin: "8px",
                color: "white",
                marginTop: "3%",
              }}
              autoFocus
              ref={inputRef}
              value={msg}
              onChange={changeMsg}
              placeholder="Please enter message"
              inputProps={{
                style: {
                  height: "10px",
                },
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSubmit(event);
                }
              }}
            />
          </FormControl>
        </Box>
        <Button
          style={{
            width: "8.5vw",
            justifyContent: "center",
            alignItems: "center",
            verticalAlign: "middle",
            margin: "2.5% 0 2.5% 0",
          }}
          variant="contained"
          onClick={onSubmit}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default BottomField;
