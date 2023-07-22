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
import "@/components/main/room_list/RoomList.css";
import { IChatRoom } from "./RoomTypeButton";
import CreateRoomModal from "./CreateRoomModal";
import MemberList from "../member_list/MemberList";
import ProtectedModal from "./ProtectedModal";
import CreateRoomButton from "./CreateRoomButton";

const Bar2 = forwardRef((props: any, ref: any) => (
  <span {...props} ref={ref}>
    {props.children}
  </span>
));

export default function Rooms({
  roomsProp,
  channelType,
  showMembersList,
  setShowMembersList,
}: {
  roomsProp: IChatRoom[];
  channelType: boolean;
  showMembersList: boolean;
  setShowMembersList: Dispatch<SetStateAction<boolean>>;
}) {
  const [isRight, setIsRight] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const [fail, setFail] = useState<boolean>(false);
  const [aRoom, setARoom] = useState<IChatRoom>();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  const handleClose2 = () => {
    setOpen2(false);
    setFail(false);
  };

  const RoomClick = (room: IChatRoom) => {
    setARoom(room);
    room.password == "" ? setIsRight(true) : handleOpen2();
    setShowMembersList(false);
  };

  useEffect(() => {
    isRight ? setShowMembersList(true) : null;
  }, [isRight]);

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
      <div className={!showMembersList ? "list" : "roomclicked"}>
        <CreateRoomButton channelType={channelType} />
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
      {showMembersList &&
        portalContainer &&
        createPortal(
          <MemberList
            showMembersList={showMembersList}
            aRoom={aRoom}
            isRight={isRight}
            setIsRight={setIsRight}
          />,
          portalContainer
        )}
    </>
  );
}
