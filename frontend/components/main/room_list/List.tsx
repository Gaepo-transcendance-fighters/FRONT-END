// use client;
import { IChatRoom } from "./RoomTypeButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "@/components/main/room_list/RoomList.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, Dispatch, SetStateAction } from "react";
import CreateRoomModal from "./CreateRoomModal";

export default function List({
  roomsProp,
  channelType,
  showPtcptsList,
  setShowPtcptsList,
}: {
  roomsProp: IChatRoom[];
  channelType: boolean;
  showPtcptsList: boolean;
  setShowPtcptsList: Dispatch<SetStateAction<boolean>>;
}) {
  const RoomClick = (room : IChatRoom) => {
    console.log("room info : ", room);
    setShowPtcptsList(true);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };
  return (
    <div className={!showPtcptsList ? "list" : "roomclicked"}>
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
            <CreateRoomModal prop={handleClose} />
          </Modal>
        </>
      ) : (
        ""
      )}
      {roomsProp.map((room ,idx) => {
        return (
          <button key={idx} className="item" onClick={() => RoomClick(room)}>
            <div className="roomidx">{leftPadding(room.channelIdx)}</div>
            <div className="owner">{room.owner}'s</div>
            <div className="lock">
              {room.password == "" ? (
                ""
              ) : (
                <LockRoundedIcon sx={{ height: "13px", color:"#afb2b3" }} />
              )}
            </div>
          </button> //room button 누르면 room idx 넘겨주기
        );
      })}
    </div>
  );
}
