"use client";

import Modal from "@mui/material/Modal";
import {
  Dispatch,
  SetStateAction,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";
import "./ProtectedModal.css";
import { IChatRoom } from "./RoomTypeButton";
import EnterProtectedRoom from "./EnterProtectedRoom";

export default function ProtectedModal({
  open2,
  handleClose2,
  setIsRight,
  aRoom,
  setFail,
  fail,
  Bar2,
}: {
  open2: boolean;
  handleClose2: () => void;
  isRight: boolean;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  aRoom: IChatRoom | undefined;
  setFail: Dispatch<SetStateAction<boolean>>;
  fail: boolean;
  Bar2: ForwardRefExoticComponent<Omit<any, "ref"> & RefAttributes<unknown>>;
}) {
  return (
    <Modal
      open={open2}
      onClose={handleClose2}
      aria-labelledby="protected-room-modal"
      aria-describedby="enter-password-modal"
    >
      {/* <Bar2> */}
        <EnterProtectedRoom
          handleClose2={handleClose2}
          setIsRight={setIsRight}
          aRoom={aRoom}
          fail={fail}
          setFail={setFail}
        />
      {/* </Bar2> */}
    </Modal>
  );
}
