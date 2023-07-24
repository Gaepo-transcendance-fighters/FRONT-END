import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./ChatWindow.css";

const SendButton = () => {
  return (
    <Button className="send_button" variant="contained">
      Send
    </Button>
  );
};

export default SendButton;
