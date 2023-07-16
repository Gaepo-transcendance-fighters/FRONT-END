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
      </div>
      {showPtcptsList &&
        portalContainer &&
        createPortal(<ChatPtcptsList aRoom={aRoom} />, portalContainer)}
    </>
  );
}
