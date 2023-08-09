import "./ChatWindow.css";
import { Box } from "@mui/material";
import { useState } from "react";
import { main } from "@/font/color";

const BottomField = () => {
  const [msg, setMsg] = useState<string>("");

  return (
    <Box
      sx={{
        marginBottom: 0,
        backgroundColor: main.main2,
        // height: "11%",
        display: "flex",
        justifyContent: "center",
        margin: "0.5% 2% 2% 2%",
        borderRadius: "5px",
        minWidth: "260px",
      }}
    ></Box>
  );
};

export default BottomField;
