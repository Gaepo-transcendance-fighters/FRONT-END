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
    const messageHandler = (chatFromServer: IChat) => {
      if (roomState.currentRoom?.mode === "private") {
        const chat = {
          channelIdx: chatFromServer.channelIdx,
          senderIdx: chatFromServer.sender === roomState.currentDmRoomMemberList?.userIdx1
            ? roomState.currentDmRoomMemberList?.userIdx1
            : roomState.currentDmRoomMemberList?.userIdx2,
          sender: chatFromServer.sender,
          msg: chatFromServer.msg,
          msgDate: chatFromServer.msgDate, }
        setMsgs((prevChats: any) => [chat, ...prevChats]); // <----- any type 나중 변경 필요.
        console.log("[BottomField]디엠에서 메세지 보낼때 내가 state에 붙여주는 낱개의 메시지");
        console.log(chat);
      } else {
        const result = roomState.currentRoomMemberList.find(person => person.userIdx === chatFromServer.senderIdx)
        if (result?.nickname) {
          const chat = {
            channelIdx: chatFromServer.channelIdx,
            senderIdx: chatFromServer.senderIdx,
            sender: result?.nickname,
            msg: chatFromServer.msg,
            msgDate: chatFromServer.msgDate, 
          }
          setMsgs((prevChats: any) => [...prevChats, chat]); // <----- any type 나중 변경 필요.
        }
        else {
          console.log("[ERROR] there aren't nickname from data")
        }
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
          senderIdx: userState.userIdx,
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
          senderIdx: userState.userIdx,
          msg: msg,
          targetIdx:
            userState.userIdx === roomState.currentDmRoomMemberList?.userIdx1
              ? roomState.currentDmRoomMemberList?.userIdx2
              : roomState.currentDmRoomMemberList?.userIdx1, // <------------------ 현재 채널의 모든 사용자들의 인덱스를 알아야한다.
        };
      }
      socket.emit("chat_send_msg", JSON.stringify(payload));
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
