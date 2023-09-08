"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IFriend } from "./FriendList";
import Image from "next/image";
import MyGameLog from "../myprofile/MyGameLog";
import { socket } from "@/app/page";
import { useUser } from "@/context/UserContext";
import { useRoom } from "@/context/RoomContext";
import {
  FriendReqData,
  IChatBlock,
  IFriendData,
  IUserProp,
  friendProfileModalStyle,
  main,
} from "@/type/type";
import { IChatRoom, ReturnMsgDto } from "@/type/RoomType";
import RoomEnter from "@/external_functions/RoomEnter";
import { useFriend } from "@/context/FriendContext";
import axios from "axios";
import FriendGameButton from "../InviteGame/FriendGameButton";

const server_domain = process.env.NEXT_PUBLIC_SERVER_URL_4000;

const loginOn = (
  <Image src="/status/logon.png" alt="online" width={10} height={10} />
);

const loginOff = (
  <Image src="/status/logoff.png" alt="offline" width={10} height={10} />
);

const gamePlaying = (
  <Image
    src="/status/gameplaying.png"
    alt="gameplaying"
    width={10}
    height={10}
  />
);

const FriendProfile = ({ prop }: { prop: IUserProp }) => {
  const nickname = !prop.targetNickname
    ? prop.friendNickname
    : prop.targetNickname;
  const idx = !prop.targetIdx ? prop.friendIdx : prop.targetIdx;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [friendData, setFriendData] = useState<IFriendData>({
    targetNickname: "",
    imgUri: "",
    rank: 0,
    win: 0,
    lose: 0,
    isOnline: false,
  });
  const { roomState, roomDispatch } = useRoom();
  const { userState } = useUser();
  const { friendState, friendDispatch } = useFriend();

  const RankSrc =
    friendData.rank < 800
      ? "./rank/exp_medal_bronze.png"
      : friendData.rank >= 800 && friendData.rank < 1100
      ? "./rank/exp_medal_silver.png"
      : "./rank/exp_medal_gold.png";

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // 서버에서 API 호출 무한루프가 돌아서 임시로 수정해놓았씁니다. // 이 2 개는 맨 아래랑 같은 동작같은데 ..? ws
  // useEffect(() => {
  //   const UserProfile = (data: IFriendData) => {
  //     setFriendData(data);
  //   };
  //   // emit까지 부분은 더보기 버튼을 눌렀을 때 진행되어야할듯.
  //   socket.on("user_profile", UserProfile);
  // });

  // useEffect(() => {
  //   const ReqData = {
  //     //값 변경 필요
  //     userIdx: userState.userIdx,
  //     targetNickname: prop.friendNickname,
  //     targetIdx: prop.friendIdx,
  //   };
  //   socket.emit("user_profile", ReqData);
  // }, []);

  // 서버에서 API 호출 무한루프가 돌아서 임시로 수정해놓았씁니다.
  // useEffect(() => {
  //   // emit까지 부분은 더보기 버튼을 눌렀을 때 진행되어야할듯.
  //   const UserProfile = (data: IFriendData) => {
  //     setFriendData(data);
  //   };
  //   socket.on("user_profile", UserProfile);

  //   return () => {
  //     socket.off("user_profile");
  //   };
  // }, []);

  useEffect(() => {
    const ChatGetDmRoomList = (payload?: IChatRoom[]) => {
      if (payload) {
        roomDispatch({ type: "SET_DM_ROOMS", value: payload });
        handleCloseModal();
        roomDispatch({ type: "SET_NEW_DM_ROOM_ALERT", value: true });
      }
    };

    socket.on("create_dm", ChatGetDmRoomList);
    return () => {
      socket.off("create_dm", ChatGetDmRoomList);
    };
  }, []);

  const sendDM = (data: IUserProp) => {
    const existingRoom = roomState.dmRooms.find(
      (roomState) => roomState.targetNickname === nickname
    );
    if (existingRoom) {
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
        { targetNickname: nickname, targetIdx: idx },
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

  const deleteFriend = async () => {
    const friendReqData: FriendReqData = {
      myIdx: userState.userIdx,
      targetNickname: nickname!,
      targetIdx: idx!,
    };

    await axios({
      method: "delete",
      url: `${server_domain}/users/unfollow`,
      // url: "http://localhost:4000/users/unfollow",
      data: friendReqData,
    })
      .then((res) => {
        friendDispatch({ type: "SET_FRIENDLIST", value: res.data.result });
        friendDispatch({ type: "SET_IS_FRIEND", value: false });
      })
      .catch((err) => {
        console.log(err);
      });
    handleCloseMenu();
    handleCloseModal();
  };

  const handleOpenNdataModal = () => {
    socket.emit(
      "user_profile",
      {
        userIdx: userState.userIdx,
        targetNickname: prop.friendNickname,
        targetIdx: prop.friendIdx,
      },
      () => {
        console.log("유저프로필에 데이터 보냄");
      }
    );
    setOpenModal(true);
  };

  useEffect(() => {
    const ChatBlock = (data: IChatBlock[]) => {
      const blockList = data.map((block: IChatBlock) => {
        return { targetNickname: block.userNickname, targetIdx: block.userIdx };
      });
      friendDispatch({
        type: "ADD_BLOCK",
        value: {
          targetNickname: nickname!,
          targetIdx: idx!,
        },
      });
      friendDispatch({ type: "SET_BLOCKLIST", value: blockList });
      handleCloseMenu();
      handleCloseModal();
    };
    socket.on("chat_block", ChatBlock);

    return () => {
      socket.off("chat_block", ChatBlock);
    };
  }, []);

  const blockFriend = () => {
    socket.emit(
      "chat_block",
      {
        targetNickname: nickname,
        targetIdx: idx,
      },
      (ret: ReturnMsgDto) => {
        friendDispatch({ type: "SET_IS_FRIEND", value: false });
        console.log("FriendProfile blockFriend ret : ", ret);
      }
    );
  };

  useEffect(() => {
    const userProfile = (data: IFriendData) => {
      setFriendData(data);
    };
    socket.on("user_profile", userProfile);
    return () => {
      socket.off("user_profile");
    };
  }, [friendData]);

  // useEffect(() => {
  //   const find = friendState.blockList.find((block) =>
  //     block.targetIdx === idx
  //   );
  // }, [openModal]);

  return (
    <>
      <Button type="button" onClick={handleOpenNdataModal}>
        <Typography>더보기</Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={friendProfileModalStyle} borderRadius={"10px"}>
          <Card
            sx={{
              backgroundColor: main.main7,
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
                // src="/seal.png" // mockdata
                src={friendData?.imgUri} // < !mockdata
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
                닉네임: {friendData?.targetNickname}
              </Typography>
              <Typography>
                상태: {friendData?.isOnline ? loginOn : loginOff}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                {/* <FriendGameButton prop={prop} /> */}
                <Button
                  type="button"
                  sx={{ minWidth: "max-content" }}
                  variant="contained"
                  onClick={() => sendDM(prop)}
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
                    <MenuItem onClick={deleteFriend}>Delete</MenuItem>
                    <MenuItem onClick={blockFriend}>
                      {friendState.blockList.find(
                        (block) => block.targetIdx === idx
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
          <Card sx={{ backgroundColor: main.main7 }}>
            <CardContent sx={{ paddingBottom: 0 }}>
              <Typography>전적</Typography>
            </CardContent>
            <Stack direction={"row"}>
              {/* 이미지 */}
              <Card
                sx={{
                  margin: 1,
                  marginRight: 0,
                  width: "30%",
                  // height: "90%",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: main.main3,
                    height: "100%",
                    "&:last-child": { paddingBottom: "16px" },
                  }}
                >
                  <img
                    src={RankSrc}
                    style={{
                      width: "70%",
                      height: "70%",
                      display: "block",
                      margin: "0 auto",
                    }}
                  ></img>
                </CardContent>
              </Card>
              {/* !이미지 */}
              <Card
                sx={{
                  margin: 1,
                  width: "70%",
                  height: "60%",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: main.main3,
                    height: "100%",
                    "&:last-child": { paddingBottom: "16px" },
                  }}
                >
                  <Typography margin={1}>
                    랭크(포인트) : {friendData.rank}{" "}
                  </Typography>
                  <Typography margin={1}>
                    승률 :{" "}
                    {friendData.win + friendData.lose === 0
                      ? 0
                      : Math.floor(
                          (friendData.win /
                            (friendData.win + friendData.lose)) *
                            100
                        )}
                    %
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Card>
          <br />

          <Card
            sx={{
              // backgroundColor: "RED",
              // backgroundColor: "#3478c5",
              backgroundColor: main.main3,
              height: "50%",
              width: "100%",
              overflowY: "scroll",
            }}
            id="logs"
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{ paddingBottom: 0 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "60%",
                  height: "30%",
                  backgroundColor: main.main7,
                  border: "2px solid black",
                }}
              >
                <Typography style={{ fontSize: "2rem" }}>전적 기록</Typography>
              </Card>
            </Box>
            <br />
            <Box
              sx={{
                listStyleType: "none",
                overflowY: "scroll",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {/* <MyGameLog /> */}
            </Box>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default FriendProfile;
