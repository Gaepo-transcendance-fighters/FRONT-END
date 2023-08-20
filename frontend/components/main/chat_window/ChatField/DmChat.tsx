"use client";

import { Box, Typography } from "@mui/material";
import Chats from "./Chats(Infinitiy,no_used)";
import { useRoom } from "@/context/RoomContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { socket } from "@/app/page";
import { Dispatch, SetStateAction } from "react";
import { IChat } from "../ChatWindow";
import axios from "axios";

interface Props {
  msgs: IChat[];
  setMsgs: Dispatch<SetStateAction<IChat[]>>;
}

const DmChatField = ({ msgs, setMsgs }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const { roomState, roomDispatch } = useRoom();
  const observerTarget = useRef(null);
  const [lastDate, setLastDate] = useState<string>();
  const [pageNum, setPageNum] = useState(0);
  // 첫 메세지 20개 불러오는 로직
  useEffect(() => {
    const func = (chatList: any) => {
      // <-                       [변경필요] any type have to be changed
      chatList.message.forEach((data: any) => {
        // <--- [변경필요]any type
        const payload: IChat = {
          channelIdx: roomState.currentRoom?.channelIdx,
          senderIdx:
            data.sender === roomState.currentDmRoomMemberList?.userIdx1
              ? roomState.currentDmRoomMemberList?.userIdx1
              : roomState.currentDmRoomMemberList?.userIdx2,
          msg: data.msg,
          msgDate: data.msgDate,
        };
        setMsgs((prevState) => [...prevState, payload]);
      });
      roomDispatch({
        type: "SET_CUR_DM_MEM",
        value: {
          userIdx1: chatList.userIdx1,
          userIdx2: chatList.userIdx2,
          userNickname1: chatList.userNickname1,
          userNickname2: chatList.userNickname2,
          imgUrl: chatList.imgUrl,
        },
      });
    };

    socket.on("chat_get_DM", func);
    return () => {
      socket.off("chat_get_DM", func);
    };
  }, [msgs]);

  // 무한 스크롤 요청 부분
  // observe 시작 해주는 로직
  // 이전대화기록의 마지막을 보게되면 이전 대화기록을 요청한다.
  useEffect(() => {
    console.log("62번째줄 들어왔따.");
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          console.log("이전대화기록 불러오는 부분 이미 들어왔어.");
          // console.log("그런데 현재 lastDate는", lastDate);
          setTimeout(() => {
            setPageNum((num) => num + 1);
            console.log("pagenum get plus: ", pageNum)
          }, 500);
          setLoading(true);
        } 
        // else if (!entries[0].isIntersecting) {
        //   console.log("75번째줄");
        // }
      },
      { threshold: 1 }
    );

    console.log(observerTarget.current);
    if (observerTarget.current) {
      // console.log("새 옵저버 타겟 만들어짐.")
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget, lastDate, pageNum]);

  const callHistory = useCallback(async () => {
    if (!lastDate) {
      console.log("lastDate가 없어서 callHistory 종료");
      return;
    }
    // console.log("current last Date : " + lastDate);
    await axios
      .get(
        `http://localhost:4000/chat/messages?channelIdx=${roomState.currentRoom?.channelIdx}&msgDate=${lastDate}`
      )
      .then((res) => {
        console.log(res);
        const newData = Array.isArray(res.data) ? res.data : [res.data];
        setMsgs((prevMsgs) => [...prevMsgs, ...newData]);
        setLoading(false);
      });
  }, [lastDate, pageNum, setMsgs]);

  useEffect(() => {
      setTimeout(() => {
        callHistory();
      }, 500);
      setLoading(true);
  }, [pageNum]);
  
  // 이전 대화기록을 불러오거나, 새로 채팅을 송수신하게되면 그때마다 불러와진 대화기록 중 제일 오래된 메세지의 Date를 가져온다.
  useEffect(() => {
    if (msgs.length > 0) {
      const lastIdx = msgs.length - 1;
      const lastElement = msgs[lastIdx];
      setLastDate(lastElement.msgDate);
      // console.log("메세지 갱신됐어, 라스트 데이트도 업뎃함");
    }
  }, [msgs]);

  useEffect(() => {
    if (lastDate) {
      console.log(lastDate);
    }
  }, [lastDate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column-reverse",
        overflowY: "scroll",
        overflowAnchor: "none",
        position: "sticky",
        backgroundColor: "#3272D2",
        height: "40vh",
        borderRadius: "5px",
        listStyleType: "none",
        margin: "0% 2% 1% 2%",
      }}
    >
      {msgs.map((value, i) => {
        return (
          <ul
            key={i}
            style={{ margin: "1% 0% 1% 0%", padding: "2% 2% 0.5% 2%" }}
          >
            <div
              style={{
                listStyleType: "none",
                margin: "0px 0 0 0",
                color: "white",
                padding: 0,
              }}
            >
              {
                <Typography variant="h6">
                  {value.senderIdx + ": " + value.msg}
                </Typography>
              }
            </div>
          </ul>
        );
      })}
      <div ref={observerTarget}>"여기가 타겟자리"</div>
      <Typography style={{ color: "white" }}>
        {loading === true && <p>loading...</p>}
      </Typography>
    </Box>
  );
};

export default DmChatField;
