"use client";

import Image from "next/image";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import "@/components/main/member_list/MemberList.css";
import { useState, MouseEvent } from "react";
import MemberModal from "./MemberModal";
import { IMember, Permission, useRoom } from "@/context/RoomContext";
import { Menu, MenuItem } from "@mui/material";
import { Mode } from "@/components/public/Layout";
import { useUser } from "@/context/UserContext";

export default function Member({
  idx,
  person,
}: {
  idx: number;
  person: IMember;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { roomState } = useRoom();
  const { userState } = useUser();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenMenu = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
          {person.permission === Permission.OWNER ? (
            <StarRoundedIcon sx={{ height: "15px", color: "yellow" }} />
          ) : null}
          {person.permission === Permission.ADMIN ? (
            <StarOutlineRoundedIcon sx={{ height: "15px", color: "yellow" }} />
          ) : null}
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem>Set Admin</MenuItem>
        <MenuItem>Mute</MenuItem>
        <MenuItem>Kick</MenuItem>
        <MenuItem>Ban</MenuItem>
      </Menu>
      {/* <MemberModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        person={person}
      /> */}
    </>
  );
}
