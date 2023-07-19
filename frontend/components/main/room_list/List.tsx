"use client";

import {
  useState,
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Modal from "@mui/material/Modal";
import "@/components/main/room_list/RoomList.css";
import { IChatRoom } from "./RoomTypeButton";
import CreateRoomModal from "./CreateRoomModal";
import MemList from "../mem_list/MemList";
import ProtectedModal from "./ProtectedModal";

const Bar = forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));
const Bar2 = forwardRef((props: any, ref: any) => (
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
  const [isRight, setIsRight] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const [fail, setFail] = useState<boolean>(false);
  const handleClose2 = () => {
    setOpen2(false);
    setFail(false);
  };
  const [aRoom, setARoom] = useState<IChatRoom>();

  const RoomClick = (room: IChatRoom) => {
    setARoom(room);
    room.password == "" ? setIsRight(true) : handleOpen2();
    setShowPtcptsList(false);
  };

  useEffect(() => {
    isRight ? setShowPtcptsList(true) : null;
  }, [isRight]);

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
            <button key={idx} className="item" onClick={() => RoomClick(room)}>
              <div className="roomidx">{leftPadding(room.channelIdx)}</div>
              <div className="owner">{room.owner}'s</div>
              <div className="lock">
                {room.password ? (
                  <LockRoundedIcon sx={{ height: "13px", color: "#afb2b3" }} />
                ) : (
                  ""
                )}
              </div>
            </button>
          );
        })}
        <ProtectedModal
          open2={open2}
          handleClose2={handleClose2}
          isRight={isRight}
          setIsRight={setIsRight}
          aRoom={aRoom}
          fail={fail}
          setFail={setFail}
          Bar2={Bar2}
        />
      </div>
      {showPtcptsList &&
        portalContainer &&
        createPortal(
          <MemList
            showPtcptsList={showPtcptsList}
            aRoom={aRoom}
            isRight={isRight}
            setIsRight={setIsRight}
          />,
          portalContainer
        )}
    </>
  );
}
