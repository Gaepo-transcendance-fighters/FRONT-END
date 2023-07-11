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
  return (
    <div className="list">
      {channelType ? <button className="add">+</button> : ""}
      {roomsProp.map((room) => {
        return (
          <Tooltip title={room.participants} arrow>
            <button className="item">
              {room.password == "" ? (
                room.participants
              ) : (
                <>
                  <LockRoundedIcon sx={{ height: "13px" }} />
                  <div className="pr">{room.participants}</div>
                </>
              )}
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
