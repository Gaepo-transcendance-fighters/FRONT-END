import { Box, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import {
  ChangeEvent,
  useRef,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { IChatRoom } from "./RoomTypeButton";

const box = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "333px",
  height: "200px",
  bgcolor: "rgb(25, 200, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
};

const box2 = {
  width: "100",
  height: "136px",
  bgcolor: "rgb(18, 163, 255)",
  border: 0,
  borderRadius: "10px",
  color: "white",
  m: 4,
};

export default function EnterProtectedRoom({
  handleClose2,
  handleClose3,
  fail,
  room,
  setFail,
  setIsRight,
  setARoom,
}
: {
  handleClose2: () => void;
  handleClose3: () => void;
  fail: boolean;
  room: IChatRoom;
  setFail: Dispatch<SetStateAction<boolean>>;
  setIsRight: Dispatch<SetStateAction<boolean>>;
  setARoom: Dispatch<SetStateAction<IChatRoom | undefined>>;
}) {
  const pwRef = useRef("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    pwRef.current = e.target.value;
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFail(false);
    e.preventDefault();
    if (pwRef.current == room.password) {
      setIsRight(true);
      handleClose2();
      setFail(false);
      setARoom(room);
    } else {
      setIsRight(false);
      setFail(true);
    }
    pwRef.current = "";
  };

  return (
    <>
      <Box sx={box}>
        <button className="prxbutton" onClick={handleClose2}>
          X
        </button>
        <Box sx={box2}>
          <div className="prlock">
            <LockRoundedIcon
              sx={{ height: "100%", width: "100%", color: "#6c899b" }}
            />
          </div>
          <Box className="prboxcontainer">
            <input
              className="prinput"
              type="password"
              placeholder="password"
              onChange={onChange}
            ></input>
            <button className="prsubmitbutton" onClick={onClick}>
              submit
            </button>
          </Box>
          <div className="prfailmsg">
            {!fail ? null : (
              <Typography sx={{ fontSize: "16px" }}>
                Please check your password
              </Typography>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
}
