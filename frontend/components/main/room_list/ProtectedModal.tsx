"use client";

import Modal from "@mui/material/Modal";
import { Dispatch, SetStateAction } from "react";
import "./ProtectedModal.css";
import { IChatRoom } from "./RoomTypeButton";
import EnterProtectedRoom from "./EnterProtectedRoom";
import { HoldRef } from "./CreateRoomButton";

export default function ProtectedModal({
  open2,
  handleClose2,
  handleClose3,
  setIsRight,
  room,
  setFail,
  setARoom,
  fail, // aRoom,
}: {
  open2: boolean;
  handleClose2: () => void;
  handleClose3: () => void;
  isRight: boolean;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  room: IChatRoom;
  setFail: Dispatch<SetStateAction<boolean>>;
  fail: boolean;
  setARoom: Dispatch<SetStateAction<IChatRoom | undefined>>;
  // aRoom: IChatRoom | undefined;
}) {
  return (
    <Modal
      open={open2}
      onClose={handleClose3}
      aria-labelledby="protected-room-modal"
      aria-describedby="enter-password-modal"
    >
      <HoldRef>
        <EnterProtectedRoom
          handleClose2={handleClose2}
          handleClose3={handleClose3}
          setIsRight={setIsRight}
          room={room}
          fail={fail}
          setFail={setFail}
          setARoom={setARoom}
          // aRoom={aRoom}
        />
      </HoldRef>
    </Modal>
  );
}
