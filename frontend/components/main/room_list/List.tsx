// use client;
import { IChatRoom } from "./RoomTypeButton";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import "@/components/main/room_list/RoomList.css";
import Tooltip from "@mui/material/Tooltip";

export default function List({
  roomsProp,
  channelType,
}: {
  roomsProp: IChatRoom[];
  channelType: boolean;
}) {

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else
      return idx;
  };
  return (
    <div className="list">
      {channelType ? <button className="add">+</button> : ""}
      {roomsProp.map((room) => {
        return (
          <button className="item">
            <div className="roomidx">{leftPadding(room.channelIdx)}</div>
            <div className="owner">{room.owner}'s</div>
            <div className="lock">{room.password == "" ? "" : <LockRoundedIcon sx={{ height: "13px" }} />}</div>
          </button>
        );
      })}
    </div>
  );
}
