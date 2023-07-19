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

const style = {
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

const style2 = {
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
  fail,
  aRoom,
  setFail,
  setIsRight,
}: {
  handleClose2: () => void;
  fail: boolean;
  aRoom: IChatRoom | undefined;
  setFail: Dispatch<SetStateAction<boolean>>;
  setIsRight: Dispatch<SetStateAction<boolean>>;
}) {
  const pwRef = useRef("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    pwRef.current = e.target.value;
  };

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFail(false);
    e.preventDefault();
    console.log("aRoom?.password", aRoom?.password);
    if (pwRef.current == aRoom?.password) {
      setIsRight(true);
      handleClose2();
      setFail(false);
    } else {
      setIsRight(false);
      setFail(true);
    }
    pwRef.current = "";
  };
  return (
    <>
      <Box sx={style}>
        <button className="xbutton" onClick={handleClose2}>
          X
        </button>
        <Box sx={style2}>
          <div className="prlock">
            <LockRoundedIcon
              sx={{ height: "100%", width: "100%", color: "#6c899b" }}
            />
          </div>
          <Box className="BoxContainer">
            <input
              className="input"
              type="password"
              placeholder="password"
              onChange={onChange}
            ></input>
            <button className="submitButton" onClick={onClick}>
              submit
            </button>
          </Box>
          <div className="failMsg">
            {!fail ? null : (
              <Typography sx={{ fontSize: "16px" }}>
                Please check your password!
              </Typography>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
}
