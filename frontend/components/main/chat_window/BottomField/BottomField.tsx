"use client";

import { Box, Button } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { io } from "socket.io-client";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import { useRoom } from "@/context/RoomContext";
import { useAuth } from "@/context/AuthContext";

const userId = 7;
// export const socket = io('http://localhost:4000/chat');
const socket = io("http://localhost:4000/chat", {
  query: { userId: userId },
});
interface IChat {
  username: string;
  senderIdx: number;
  msg: string;
  msgDate: string;
}
// setMsgs: Dispatch<SetStateAction<IChat[]>>
const BottomField = () => {
  const [msg, setMsg] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [msgs, setMsgs] = useState<IChat[]>([]);
  const { roomState } = useRoom();
  const { state } = useAuth();

  const changeMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
  };

  useEffect(() => {
    const messageHandler = (chat:IChat[]) => {
      setMsgs((prevChats:any) => [...prevChats, chat]);
      setMsg("");
      console.log(chat);
      console.log("myid : "+state.id);
    };
    socket.on("chat_send_msg", messageHandler);

    return () => {
      socket.off("chat_send_msg", messageHandler);
    };
  }, []);

  useEffect(() => {
    console.log("myid : "+state.id);
  })

  useEffect(() => {
    inputRef.current?.focus();
  });

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      const payload = { channelIdx: roomState.currentRoom?.channelIdx, senderIdx: 3, msg: msg };
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
        borderRadius: "5px",
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
                marginTop: "2%",
              }}
              autoFocus
              ref={inputRef}
              value={msg}
              onChange={changeMsg}
              placeholder="Please enter message"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  onSubmit(event);
                }
              }}
            />
          </FormControl>
        </Box>
        <Button
          // type="submit"
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
