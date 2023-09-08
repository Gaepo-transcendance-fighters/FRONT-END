"use client";

import {
  Modal,
  Box,
  Card,
  Stack,
  Typography,
  Menu,
  CardContent,
  Button,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IFriend } from "../friend_list/FriendList";
import { IChatDmEnter, IChatRoom, ReturnMsgDto } from "@/type/RoomType";
import { IMember } from "@/type/RoomType";
import { useFriend } from "@/context/FriendContext";
import { socket } from "@/app/page";
import RoomEnter from "@/external_functions/RoomEnter";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import MemberGameButton from "../InviteGame/MemberGameButton";
import {
  FriendReqData,
  IChatBlock,
  friendProfileModalStyle,
} from "@/type/type";
import { useRoom } from "@/context/RoomContext";

const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

const loginOn = (
  <Image src="/status/logon.png" alt="online" width={10} height={10} />
);

const loginOff = (
  <Image src="/status/logoff.png" alt="offline" width={10} height={10} />
);

export default function MemberModal({
  setOpenModal,
  openModal,
  person,
}: {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  person: IMember;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [curFriend, setCurFriend] = useState<IFriend | null>(null);
  const { roomState, roomDispatch } = useRoom();
  const { userState } = useUser();
  const { friendState, friendDispatch } = useFriend();

  useEffect(() => {
    setCurFriend({
      friendNickname: person.nickname!,
      friendIdx: person.userIdx!,
      isOnline: true,
    });
  }, []);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const addFriend = async () => {
    const friendReqData: FriendReqData = {
      myIdx: userState.userIdx,
      targetNickname: person.nickname!,
      targetIdx: person.userIdx!,
    };
    await axios({
      method: "post",
      url: `${server_domain}/users/follow`,
      // url: "http://localhost:4000/users/follow",
      data: friendReqData,
    })
      .then((res) => {
        console.log("res : ", res.data.result);
        console.log("res : ", res.data.result.friendIdx);
        // console.log("res : ", res.data.result.isOnline);
        // friendDispatch({type: "ADD_FRIEND",
        // value: {
        //   friendNickname: person.nickname!,
        //   friendIdx: person.userIdx!,
        //   isOnline: res.data.result.isOnline
        // }})
        friendDispatch({ type: "SET_FRIENDLIST", value: res.data.result });
        friendDispatch({ type: "SET_IS_FRIEND", value: true });
      })
      .catch((err) => {
        console.log(err);
      });
    handleCloseMenu();
    handleCloseModal();
  };

  const deleteFriend = async () => {
    const friendReqData: FriendReqData = {
      myIdx: userState.userIdx,
      targetNickname: person.nickname!,
      targetIdx: person.userIdx!,
    };

    await axios({
      method: "delete",
      url: `${server_domain}/users/unfollow`,
      // url: "http://localhost:4000/users/unfollow",
      data: friendReqData,
    })
      .then((res) => {
        friendDispatch({ type: "SET_FRIENDLIST", value: res.data });
        friendDispatch({ type: "SET_IS_FRIEND", value: false });
      })
      .catch((err) => {
        console.log(err);
      });
    handleCloseMenu();
    handleCloseModal();
  };

  useEffect(() => {
    const ChatBlock = (data: any) => {
      const blockList = data.map((block: IChatBlock) => {
        return {
          blockedNickname: block.blockedNickname,
          blockedUserIdx: block.blockedUserIdx,
        };
      });
      friendDispatch({
        type: "ADD_BLOCK",
        value: {
          blockedNickname: person.nickname!,
          blockedUserIdx: person.userIdx!,
        },
      });
      friendDispatch({ type: "SET_IS_FRIEND", value: false });
      friendDispatch({ type: "SET_BLOCKLIST", value: blockList });
      handleCloseMenu();
      handleCloseModal();
    };
    socket.on("chat_block", ChatBlock);

    return () => {
      socket.off("chat_block", ChatBlock);
    };
  }, []);

  useEffect(() => {
    if (friendState.friendList.length) {
      friendState.friendList.find(
        (friend) => friend.friendNickname === person.nickname
      )
        ? friendDispatch({ type: "SET_IS_FRIEND", value: true })
        : friendDispatch({ type: "SET_IS_FRIEND", value: false });
    }
  }, [friendState.isFriend, friendState.friendList]);

  useEffect(() => {
    const ChatGetDmRoomList = (payload?: IChatRoom[]) => {
      payload ? roomDispatch({ type: "SET_DM_ROOMS", value: payload }) : null;
      handleCloseModal();
      roomDispatch({ type: "SET_NEW_DM_ROOM_ALERT", value: true });
    };

    socket.on("create_dm", ChatGetDmRoomList);
    return () => {
      socket.off("create_dm", ChatGetDmRoomList);
    };
  }, []);

  const sendDM = () => {
    const existingRoom = roomState.dmRooms.find(
      (element) => element.targetNickname === person.nickname
    );
    if (existingRoom) {
      // 이미 dm 방이 존재. 그럼 기존 방 리디렉션
      socket.emit(
        "chat_get_DM",
        {
          channelIdx: existingRoom.channelIdx,
        },
        (ret: ReturnMsgDto) => {
          if (ret.code === 200) {
            RoomEnter(existingRoom, roomState, userState, roomDispatch);
            handleCloseModal();
          } else {
            console.log(ret.msg);
            return;
          }
        }
      );
    } else {
      // 방이 존재하지 않는다. 그럼 새로운 방만들기
      socket.emit(
        "create_dm",
        { targetNickname: person.nickname, targetIdx: person.userIdx },
        (ret: ReturnMsgDto) => {
          if (ret.code === 200) {
            console.log(ret.msg);
          } else if (ret.code !== 200) {
            console.log(ret.msg);
          }
        }
      );
    }
  };

  const blockFriend = () => {
    socket.emit(
      "chat_block",
      {
        targetNickname: person.nickname,
        targetIdx: person.userIdx,
      },
      (ret: ReturnMsgDto) => {
        console.log("blockFriend ret : ", ret);
      }
    );
  };

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={friendProfileModalStyle} borderRadius={"10px"}>
        <Card
          sx={{
            backgroundColor: "#48a0ed",
            width: "100wv",
            display: "flex",
            padding: 2,
          }}
        >
          <Box
            sx={{
              borderRadius: "70%",
              width: "max-content",
              overflow: "hidden",
            }}
            mx={5}
          >
            <Image
              src={person.imgUri!}
              alt="user img"
              width={100}
              height={100}
            />
          </Box>
          <Stack
            sx={{
              width: "15vw",
            }}
            spacing={1}
          >
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              닉네임: {curFriend?.friendNickname}
            </Typography>
            <Typography>
              상태: {curFriend?.isOnline ? loginOn : loginOff}
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <MemberGameButton prop={person} />
              <Button
                type="button"
                sx={{ minWidth: "max-content" }}
                variant="contained"
                onClick={sendDM}
              >
                DM
              </Button>
              <Button
                type="button"
                sx={{ minWidth: "max-content" }}
                variant="contained"
                onClick={handleOpenMenu}
              >
                더보기
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                MenuListProps={{ sx: { py: 0 } }}
              >
                <Stack sx={{ backgroundColor: "#48a0ed" }}>
                  {!friendState.blockList.find(
                    (block) => block.blockedUserIdx === person.userIdx
                  ) ? (
                    <>
                      {!friendState.friendList.find(
                        (friend) => friend.friendIdx === person.userIdx
                      ) && <MenuItem onClick={addFriend}>Add</MenuItem>}
                      {friendState.friendList.find(
                        (friend) => friend.friendIdx === person.userIdx
                      ) && <MenuItem onClick={deleteFriend}>Delete</MenuItem>}
                    </>
                  ) : null}

                  <MenuItem onClick={blockFriend}>
                    {friendState.blockList.find(
                      (block) => block.blockedUserIdx === person.userIdx
                    ) === undefined
                      ? "Block"
                      : "UnBlock"}
                  </MenuItem>
                </Stack>
              </Menu>
            </Stack>
          </Stack>
        </Card>
        <br />
        <Card sx={{ backgroundColor: "#3478c5" }}>
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography>전적</Typography>
          </CardContent>
          <Stack direction={"row"}>
            <Card
              sx={{
                margin: 1,
                marginRight: 0,
                width: "30%",
                height: "max-content",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#48a0ed",
                  height: "100%",
                  "&:last-child": { paddingBottom: "16px" },
                }}
              >
                <Typography margin={1} minWidth={"max-content"}>
                  랭크(포인트)
                </Typography>
                <Typography margin={1}>승률</Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                margin: 1,
                width: "70%",
                height: "max-content",
              }}
            >
              <CardContent
                sx={{
                  backgroundColor: "#48a0ed",
                  height: "100%",
                  "&:last-child": { paddingBottom: "16px" },
                }}
              >
                <Typography margin={1}>3000</Typography>
                <Typography margin={1}>0%</Typography>
              </CardContent>
            </Card>
          </Stack>
        </Card>
        <br />
        <Card
          sx={{
            backgroundColor: "#3478c5",
            height: "170px",
          }}
        >
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography>전적 기록</Typography>
          </CardContent>
          <Stack direction={"row"}>
            <Card
              sx={{
                margin: 1,
                width: "100%",
                height: "120px",
                backgroundColor: "#48a0ed",
                overflow: "scroll",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "#86d8f7",
                  margin: 1,
                }}
              >
                <Stack direction={"row"}>
                  <CardContent
                    sx={{ "&:last-child": { paddingBottom: "16px" } }}
                  >
                    <Typography>WIN</Typography>
                  </CardContent>
                  <CardContent
                    sx={{ "&:last-child": { paddingBottom: "16px" } }}
                  >
                    <Typography>hoslim VS jujeon</Typography>
                  </CardContent>
                  <CardContent
                    sx={{ "&:last-child": { paddingBottom: "16px" } }}
                  >
                    <Typography>5 : 3</Typography>
                  </CardContent>
                </Stack>
              </Card>
            </Card>
          </Stack>
        </Card>
      </Box>
    </Modal>
  );
}
