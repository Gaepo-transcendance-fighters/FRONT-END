"use client";

import Image from "next/image";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import "@/components/main/member_list/MemberList.css";
import { useState, MouseEvent, useEffect } from "react";
import MemberModal from "./MemberModal";
import { IMember, Permission, useRoom } from "@/context/RoomContext";
import { Menu, MenuItem } from "@mui/material";
import { Mode } from "@/components/public/Layout";
import { useUser } from "@/context/UserContext";
import Alert from "@mui/material/Alert";
import { socket } from "@/app/layout";

const alert = {
  position: "absolute" as "absolute",
  top: "100%",
  left: "50%",
  transform: "translate(-50%, -100%)",
};

export default function Member({
  idx,
  person,
}: {
  idx: number;
  person: IMember;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { roomState, roomDispatch } = useRoom();
  const { userState } = useUser();
  const strings = ["now an administrator", "muted", "kicked", "banned"];
  const [string, setString] = useState<string>("");
  const [admin, setAdmin] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    const CheckGrant = (json: any) => {
      console.log("CheckGrant : ", json);
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
    socket.emit(
      "chat_get_grant",
      JSON.stringify({
        userIdx: userState.userIdx,
        channelIdx: roomState.currentRoom?.channelIdx,
      }),
      () => {}
    );
    // setAnchorEl(e.currentTarget);
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
  /*
  {
    channelIdx : number,
    userIdx : number,
    grant : boolean,
  }
  */

  // useEffect(() => {
  //   const ChatRoomAdmin = (json : IChatRoomAdmin) => {
  //     roomDispatch({type : "SET_CUR_MEM", value : json.leftMember});
  //   };
  //   socket.on("chat_room_admin", ChatRoomAdmin);

  //   return () => {
  //     socket.off("chat_room_admin", ChatRoomAdmin);
  //   };
  // }, []);

  const SetAdmin = () => {
    // socket.emit("chat_room_admin", JSON.stringfy(
    // {
    //   channelIdx : roomState.currentRoom?.channelIdx,
    //   userIdx : number,
    //   grant : Permission.ADMIN,
    // }), (statusCode) => {
    setShowAlert(true);
    setString(strings[0]);
    // });
  };

  const Mute = () => {
    // socket.emit("chat_mute");
    setShowAlert(true);
    setString(strings[1]);
  };

  const Kick = () => {
    // socket.emit("chat_kick", JSON.stringfy(
    // {
    //   channelIdx : roomState.currentRoom?.channelIdx,
    //   targetNickname : string,
    // targetIdx : number
    // }), (statusCode) => {
    // if (statusCode === 200) {

    setShowAlert(true);
    setString(strings[2]);
    // }
  };

  const Ban = () => {
    // socket.emit("chat_ban");
    setShowAlert(true);
    setString(strings[3]);
  };
  return (
    <>
      <div
        key={idx}
        className="membtn"
        onClick={handleOpenModal}
        onContextMenu={
          roomState.currentRoom?.mode !== Mode.PRIVATE
            ? (e) => handleOpenMenu(e)
            : undefined
        }
      >
        <div className="memimg">
          <Image src="/seal.png" alt="profile" width={53} height={53} />
          {/* <Image src={person.imgUri} alt="profile" width={53} height={53} /> */}
        </div>
        <div className="memname">{person.nickname}</div>
        <div className="memicon">
          {/* {person.permission === Permission.OWNER ? (
              <StarRoundedIcon sx={{ height: "15px", color: "yellow" }} />
            ) : null}
            {person.permission === Permission.ADMIN ? (
              <StarOutlineRoundedIcon
                sx={{ height: "15px", color: "yellow" }}
              />
            ) : null} */}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={SetAdmin}>
          {admin ? "Set Admin" : "Unset Admin"}
        </MenuItem>
        <MenuItem onClick={Mute}>Mute</MenuItem>
        <MenuItem onClick={Kick}>Kick</MenuItem>
        <MenuItem onClick={Ban}>Ban</MenuItem>
      </Menu>
      {showAlert ? (
        <Alert sx={alert} severity="info" style={{ width: "333px" }}>
          {/* {person.nickname} is {string} */}
          {person.nickname} is not an administrator anymore
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

/*
person is kicked
person is banned
person is muted
person is now an administrator
person is not an administrator anymore
*/
