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
import WaitAccept from "../InviteGame/WaitAccept";
import MyGameLog from "../myprofile/MyGameLog";
import { socket } from "@/app/page";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { useRoom } from "@/context/RoomContext";
import { IChatRoom, ReturnMsgDto, main } from "@/type/type";
import RoomEnter from "@/external_functions/RoomEnter";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 700,
  bgcolor: "#65d9f9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

interface IFriendData {
  targetNickname: string;
  imgUri: string;
  rank: number;
  Win: number;
  Lose: number;
  isOnline: boolean;
}

interface FriendReqData {
  userIdx: number;
  targetNickname: string;
  targetIdx: number;
}

const FriendProfile = ({ prop }: { prop: IFriend }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [friendData, setFriendData] = useState<IFriendData>({
    targetNickname: "",
    imgUri: "",
    rank: 0,
    Win: 0,
    Lose: 0,
    isOnline: false,
  });

  const { userState } = useUser();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // 서버에서 API 호출 무한루프가 돌아서 임시로 수정해놓았씁니다.
  useEffect(() => {
    const UserProfile = (data: IFriendData) => {
      setFriendData(data);
    };
    // emit까지 부분은 더보기 버튼을 눌렀을 때 진행되어야할듯.
    socket.on("user_profile", UserProfile);
  });

  useEffect(() => {
    const ReqData = {
      //값 변경 필요
      userIdx: userState.userIdx,
      targetNickname: prop.friendNickname,
      targetIdx: prop.friendIdx,
    };
    socket.emit("user_profile", ReqData);
  }, [])

  const RankImgSelect = (data: IFriendData) => {
    if (data.rank < 800) return "./rank/exp_medal_bronze.png";
    else if (data.rank >= 800 && data.rank < 1100)
      return "./rank/exp_medal_silver.png";
    else if (data.rank >= 1100) return "./rank/exp_medal_gold.png";
  };

  const RankSrc = RankImgSelect(friendData);
  const { roomState, roomDispatch } = useRoom();

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

  const sendDM = (data: IFriend) => {
    const existingRoom = roomState.dmRooms.find(
      (roomState) => roomState.targetNickname === data.friendNickname
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
    }
    else {
      // 방이 존재하지 않는다. 그럼 새로운 방만들기
      socket.emit("create_DM", {
        targetNickname : data.friendNickname,
        targetIdx : data.friendIdx,
      }, (ret: ReturnMsgDto) => {
        if (ret.code === 200) {
          console.log(ret.msg);
        } else {
          console.log(ret.msg);
          return ;
        }
      })
    }
  };

  return (
    <>
      <Button type="button" onClick={handleOpenModal}>
        <Typography>더보기</Typography>
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle} borderRadius={"10px"}>
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
                src={friendData?.imgUri}
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
                상태:{" "}
                {friendData.isOnline === true ? <>Online</> : <>Offline</>}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <WaitAccept />
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
                    <MenuItem>Add</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Block</MenuItem>
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
                    승률{" "}
                    {Math.floor(
                      (friendData.Win / (friendData.Win + friendData.Lose)) *
                        100
                    )}
                    :
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
              <MyGameLog />
            </Box>
          </Card>
        </Box>
      </Modal>
    </>
  );
};

export default FriendProfile;
