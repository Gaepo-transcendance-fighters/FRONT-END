"use client";

import Image from "next/image";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import "@/components/main/member_list/MemberList.css";
import { useState, MouseEvent, useEffect } from "react";
import MemberModal from "./MemberModal";
import { useRoom } from "@/context/RoomContext";
import {
  IChatKick,
  IChatMute,
  IChatRoomAdmin,
  IMember,
  Mode,
  Permission,
  alert,
} from "@/type/type";
import { Menu, MenuItem } from "@mui/material";
import { useUser } from "@/context/UserContext";
import Alert from "@mui/material/Alert";
import { socket } from "@/app/page";

export default function Member({
  idx,
  person,
}: {
  idx?: number;
  person: IMember;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [string, setString] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAry, setAdminAry] = useState<string[]>([]);
  const [isGranted, setIsGranted] = useState<boolean>(false);
  const { roomState, roomDispatch } = useRoom();
  const { userState } = useUser();
  const strings = [
    "now an administrator",
    "not an administrator anymore",
    "muted",
    "kicked",
    "banned",
  ];

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const CheckGrant = (json: Permission) => {
      // setAuthorization(json);
      json === Permission.MEMBER ? setIsGranted(false) : setIsGranted(true);
    };
    socket.on("chat_get_grant", CheckGrant);

    return () => {
      socket.off("chat_get_grant", CheckGrant);
    };
  }, []);

  const handleOpenMenu = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    console.log("handleOpenMenu");
    // socket.emit(
    //   "chat_get_grant",
    //   JSON.stringify({
    //     userIdx: userState.userIdx,
    //     channelIdx: roomState.currentRoom!.channelIdx,
    //   }),
    //   (ret: any) => {
    //     console.log("handleOpenMenu ret : ", ret);
    //   }
    // );

    // ||
    // adminAry.map((admin) => {
    //   console.log("admin === person.nickname", admin, person.nickname);
    //   return admin === person.nickname ? true : false;
    // })

    // isGranted ? setAnchorEl(e.currentTarget) : null;
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (showAlert) {
      const time = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(time);
    }
  }, [showAlert]);

  useEffect(() => {
    const ChatRoomAdmin = (json: IChatRoomAdmin) => {
      // roomDispatch({ type: "SET_ADMIN_ARY", value: json.admin });
      // setAdminAry(json.admin);
    };
    socket.on("chat_room_admin", ChatRoomAdmin);

    return () => {
      socket.off("chat_room_admin", ChatRoomAdmin);
    };
  }, []);

  const SetAdmin = () => {
    socket.emit(
      "chat_room_admin",
      JSON.stringify({
        channelIdx: roomState.currentRoom?.channelIdx,
        userIdx: person.userIdx,
        grant: !isAdmin,
      }),
      (ret: string) => {
        console.log("SetAdmin : ", ret);
        setIsAdmin((prev) => !prev); //
        console.log("SetAdmin isAdmin : ", isAdmin);
        setShowAlert(true);
      }
    );
  };

  useEffect(() => {
    isAdmin ? setString(strings[0]) : setString(strings[1]);
  }, [isAdmin]);

  useEffect(() => {
    const ChatMute = (data: IChatMute) => {
      console.log("Mute : ", data);
      // console로 값 확인 후 아래
      // emit - roomId 채팅에 있던 사람들한테 알림 쏴주기
      // TODO : mute된 사람 전역? / useState
    };
    socket.on("chat_mute", ChatMute);

    return () => {
      socket.off("chat_mute", ChatMute);
    };
  });

  const Mute = () => {
    socket.emit(
      "chat_mute",
      JSON.stringify({
        channelIdx: roomState.currentRoom?.channelIdx,
        targetNickname: person.nickname,
        targetIdx: person.userIdx,
      })
    );
    setShowAlert(true);
    setString(strings[2]);
  };

  useEffect(() => {
    const ChatKick = (data: IChatKick) => {
      setShowAlert(true);
      setString(strings[3]);
      roomDispatch({ type: "SET_CUR_MEM", value: data.leftMember });
    };
    socket.on("chat_kick", ChatKick);

    return () => {
      socket.off("chat_kick", ChatKick);
    };
  }, []);

  const Kick = () => {
    socket.emit(
      "chat_kick",
      JSON.stringify({
        channelIdx: roomState.currentRoom?.channelIdx,
        targetNickname: person.nickname,
        targetIdx: person.userIdx,
      }),
      (data: any) => {
        // 아직 안정해짐
        console.log("data : ", data);
      }
    );
    // }), (statusCode : number) => {
    // if (statusCode === 200) {

    // setShowAlert(true);
    // setString(strings[3]);
    // }
  };

  useEffect(() => {
    const ChatBan = (data: IChatKick) => {
      console.log("ChatBan : ", data);
      setShowAlert(true);
      setString(strings[3]);
      roomDispatch({ type: "SET_CUR_MEM", value: data.leftMember });
    };
    socket.on("chat_kick", ChatBan);

    return () => {
      socket.off("chat_kick", ChatBan);
    };
  }, []);

  const Ban = () => {
    socket.emit(
      "chat_ban",
      JSON.stringify({
        channelIdx: roomState.currentRoom?.channelIdx,
        targetNickname: userState.nickname,
        targetIdx: userState.userIdx,
      }),
      (statusCode: any) => {
        // 아직 안정해짐
        console.log("Ban : ", statusCode);
      }
    );
    setShowAlert(true);
    setString(strings[4]);
  };

  return (
    <>
      <div
        key={idx}
        className="membtn"
        onClick={handleOpenModal}
        onContextMenu={
          // (e) => handleOpenMenu(e)
          (e) => {
            //owner일때
            //admin일때
            //mem일때
            // console.log("here");
            // socket.emit(
            //   "chat_get_grant",
            //   JSON.stringify({
            //     userIdx: userState.userIdx,
            //     channelIdx: roomState.currentRoom!.channelIdx,
            //   }),
            //   (ret: any) => {
            //     console.log("handleOpenMenu ret : ", ret);
            //   }
            // );
            console.log(
              "userState.nickname === roomState.currentRoom!.owner",
              userState.nickname,
              roomState.currentRoom!.owner
            );
            userState.nickname !== person.nickname &&
            userState.nickname === roomState.currentRoom!.owner
              ? // authorization === (Permission.ADMIN || Permission.OWNER)
                handleOpenMenu(e)
              : e.preventDefault();
          }
        }
      >
        <div className="memimg">
          <Image src="/seal.png" alt="profile" width={53} height={53} />
          {/* <Image src={person.imgUri} alt="profile" width={53} height={53} /> */}
        </div>
        <div className="memname">{person.nickname}</div>
        <div className="memicon">
          {person.nickname === roomState.currentRoom?.owner ? (
            <StarRoundedIcon sx={{ height: "15px", color: "yellow" }} />
          ) : (
            roomState.adminAry.map((admin) => {
              return admin.nickname === person.nickname ? (
                <StarOutlineRoundedIcon
                  sx={{ height: "15px", color: "yellow" }}
                />
              ) : null;
            })
          )}
          {/* {person.nickname === roomState.currentRoom?.owner ? (
            <StarRoundedIcon sx={{ height: "15px", color: "yellow" }} />
          ) : null}
          {
            roomState.adminAry.map((admin) => {
              console.log("StarOutlineRoundedIcon admin :", admin);
              return admin.nickname === person.nickname ? (
                <StarOutlineRoundedIcon
                  sx={{ height: "15px", color: "yellow" }}
                />
              ) : null;
            })
          } */}
          {/* {person.permission === Permission.ADMIN ? (
            <StarOutlineRoundedIcon sx={{ height: "15px", color: "yellow" }} />
          ) : null} */}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={SetAdmin}>
          {isAdmin ? "Unset Admin" : "Set Admin"}
        </MenuItem>
        <MenuItem onClick={Mute}>Mute</MenuItem>
        <MenuItem onClick={Kick}>Kick</MenuItem>
        <MenuItem onClick={Ban}>Ban</MenuItem>
      </Menu>
      {showAlert ? (
        <Alert sx={alert} severity="info" style={{ width: "333px" }}>
          {person.nickname} is {string}
        </Alert>
      ) : null}
      <MemberModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        person={person}
      />
    </>
  );
}
