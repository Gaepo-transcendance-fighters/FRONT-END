// use client;
import { IChatRoom } from "./RoomTypeButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "@/components/main/room_list/RoomList.css";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import React from "react";
import CreateRoomModal from "./CreateRoomModal";

const Bar = React.forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default function List({
  roomsProp,
  channelType,
}: {
  roomsProp: IChatRoom[];
  channelType: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };
  return (
    <div className="list">
      {channelType ? (
        <>
          <button className="add" onClick={handleOpen}>
            +
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-room-modal"
            aria-describedby="create-non-dm-room-modal"
          >
            <Bar>
              <CreateRoomModal prop={handleClose} />
            </Bar>
          </Modal>
        </>
      ) : (
        ""
      )}
      {roomsProp.map((room, idx) => {
        return (
          <button className="item" key={idx}>
            <div className="roomidx">{leftPadding(room.channelIdx)}</div>
            <div className="owner">{room.owner}'s</div>
            <div className="lock">
              {room.password == "" ? (
                ""
              ) : (
                <LockRoundedIcon sx={{ height: "13px" }} />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
