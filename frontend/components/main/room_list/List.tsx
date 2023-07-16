"use client";

import {
  useState,
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef
} from "react";
import { createPortal } from "react-dom";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Modal from "@mui/material/Modal";
import "@/components/main/room_list/RoomList.css";
import { IChatRoom } from "./RoomTypeButton";
import CreateRoomModal from "./CreateRoomModal";
import ChatPtcptsList from "../chat_participants_list/ChatPtcptsList";
import { Typography, Box, } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "#67dcfb",
  borderRadius: "10px",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Bar = forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

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
  const RoomClick = (room: IChatRoom) => {
    setARoom(room);
    setShowPtcptsList(true);
    room.password == "" ? null : handleOpen2();
  };

  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const container = document.getElementById("portal");
    setPortalContainer(container);

    return () => {
      setPortalContainer(null);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isProtectedRef = useRef(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => {
    console.log("it's protected room!");
    setOpen2(true);
  }
  const handleClose2 = () => setOpen2(false);
  const [aRoom, setARoom] = useState<IChatRoom>();

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };

  return (
    <>
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
              <button
                key={idx}
                className="item"
                onClick={() => RoomClick(room)}
              >
                {room.password == "" ? null : (isProtectedRef.current = true)}
                <div className="roomidx">{leftPadding(room.channelIdx)}</div>
                <div className="owner">{room.owner}'s</div>
                <div className="lock">
                  {isProtectedRef.current ? (
                    <LockRoundedIcon
                      sx={{ height: "13px", color: "#afb2b3" }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              {isProtectedRef.current = false}
              </button>
          );
        })}


      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      </div>
      {showPtcptsList &&
        portalContainer &&
        createPortal(<ChatPtcptsList aRoom={aRoom} />, portalContainer)}
    </>
  );
}
