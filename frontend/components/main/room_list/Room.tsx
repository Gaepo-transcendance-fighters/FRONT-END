import LockRoundedIcon from "@mui/icons-material/LockRounded";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import ProtectedModal from "./ProtectedModal";
import { mockMemberList0, useRoom } from "@/context/RoomContext";
import { Menu, MenuItem } from "@mui/material";
import { IChatRoom0, Mode } from "@/context/RoomContext";

export default function Room({
  room,
  idx,
  // setIsRight,
  // isRight,
}: {
  room: IChatRoom0;
  idx: number;
  // setIsRight: Dispatch<SetStateAction<boolean>>;
  // isRight: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { roomState, roomDispatch } = useRoom();
  const handleOpenMenu = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const leftPadding = (idx: number) => {
    if (idx < 10) return "00" + idx.toString();
    else if (idx < 100) return "0" + idx.toString();
    else return idx;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFail(false);
    roomState.currentRoom
      ? roomDispatch({ type: "SET_ISOPEN", value: true })
      : null;
  }; // 올바른 비번

  useEffect(() => {
    const ChatEnter = (json) => {
      json.member ? roomDispatch({ type: "SET_CUR_MEM", value: json.member }) : null;
      // 실패시 멤버 배열 안보내주시는지?
      //channelIdx 안보내줘도 될듯?
    };
    socket.on("chat_enter", ChatEnter, json);

    return () => {
      socket.off("chat_enter", ChatEnter, json);
    };
  }, []);

  const RoomClick = (room: IChatRoom0) => {
    socket.emit("chat_enter", { roomId: room.channelIdx }, 상태코드);
    if (정상상태코드) {
      room.mode === Mode.PROTECTED || roomState.currentRoom === room ? null : roomDispatch({type : "SET_CURRENTROOM", value : room});
      room.mode !== Mode.PROTECTED ? roomDispatch({ type: "SET_ISOPEN", value: true }) : handleOpen(); // 코드 정리할수있을것같음
    }
    /* 주석 해제시 멤버 리스트 정상적으로 뜸
    if (room.mode !== Mode.PROTECTED) {
      roomDispatch({ type: "SET_CUR_MEM", value: mockMemberList0 });
      roomDispatch({ type: "SET_ISOPEN", value: true });
    }
    */
  };

  return (
    <>
      <button
        key={idx}
        className="item"
        onClick={() => RoomClick(room)}
        onContextMenu={(e) => handleOpenMenu(e)}
      >
        <div className="roomidx">{leftPadding(room.channelIdx)}</div>
        <div className="owner">{room.owner}'s</div>
        <div className="lock">
          {room.mode === Mode.PROTECTED ? (
            <LockRoundedIcon sx={{ height: "13px", color: "#afb2b3" }} />
          ) : (
            ""
          )}
        </div>
      </button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem>Set Admin</MenuItem>
        <MenuItem>Mute</MenuItem>
        <MenuItem>Kick</MenuItem>
        <MenuItem>Ban</MenuItem>
      </Menu>
      <ProtectedModal
        open={open}
        handleClose={handleClose}
        // isRight={isRight}
        // setIsRight={setIsRight}
        room={room}
        fail={fail}
        setFail={setFail}
      />
    </>
  );
}
