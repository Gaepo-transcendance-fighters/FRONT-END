"use client";

import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import "@/components/main/member_list/MemberList.css";
import { useState, MouseEvent } from "react";
import MemberModal from "./MemberModal";
import { IMember } from "@/context/RoomContext";
import { Menu, MenuItem } from "@mui/material";

export default function Member({
  idx,
  person,
}: {
  idx: number;
  person: IMember;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOpenMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
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
        onContextMenu={(e) => handleOpenMenu(e)}
      >
        <div className="memimg">
          <Image src="/seal.png" alt="profile" width={53} height={53} />
        </div>
        <div className="memname">{person.nickname}</div>
        <div className="memicon">
          <StarIcon sx={{ height: "15px", color: "yellow" }} />
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
