// use client;
import { IChatRoom } from "./RoomTypeButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "@/components/main/room_list/RoomList.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState, Dispatch, SetStateAction } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //여기까지 모달 위치
  width: 400,
  bgcolor: "#67dcfb",
  border: 0,
  borderRadius : "10px",
  p: 10, // 모달 크기,
  color : "white",

};

export default function List({
  roomsProp,
  channelType,
  showFriendList,
  setShowFriendList,
}: {
  roomsProp: IChatRoom[];
  channelType: boolean;
  showFriendList: boolean;
  setShowFriendList: Dispatch<SetStateAction<boolean>>;
}) {
  const onClick = () => {
    setShowFriendList(true);
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };
  return (
    <div className={!showFriendList ? "list" : "roomclicked"}>
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
            <Box sx={style}>
              {/* <Typography id="create-room-modal" variant="h6" component="h2"> */}
              <Typography id="create-room-modal" variant="h5">
                Create Chat Room
              </Typography>
              <div>
                
              </div>
              <Typography id="create-non-dm-room-modal" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </>
      ) : (
        ""
      )}
      {roomsProp.map((room) => {
        return (
          <button className="item" onClick={onClick}>
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
