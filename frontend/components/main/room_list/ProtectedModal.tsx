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
  setIsRight,
  room,
  setFail,
  fail,
}: {
  open2: boolean;
  handleClose2: () => void;
  isRight: boolean;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  room: IChatRoom;
  setFail: Dispatch<SetStateAction<boolean>>;
  fail: boolean;
}) {
  return (
    <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="protected-room-modal"
      aria-describedby="enter-password-modal"
    >
      <HoldRef>
        <EnterProtectedRoom
          handleClose2={handleClose2}
          setIsRight={setIsRight}
          room={room}
          fail={fail}
          setFail={setFail}
        />
      </HoldRef>
    </Modal>
  );
}
