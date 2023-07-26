import { useEffect, useState } from 'react'
import { Box } from "@mui/material";
import '../ChatWindow.css'

export interface IChat {
	name: string;
	message: string;
}

const mockMessageHistories:IChat[] = [
		{
			name: "jujeon",
			message: "1 hello there",
		},
		{
			name: "jujeon",
			message: "2 dear bear",
		},
		{
			name: "jujeon",
			message: "3 I got there",
		},
		{
			name: "jujeon",
			message: "4 ft_transcendence asdkfjasdfklsadfijcj sdlkf l sdaif jisdf ljksdf ljk asd;kfadsk end",
		},
		{
			name: "jujeon",
			message: "5 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "6 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "7 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "8 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "9 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "10 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "11 ft_transcendence",
		},
		{
			name: "jujeon",
			message: "12 ende",
		}
]

const ChatField = () => {
	
	const [msgHistories, setMsgHistories] = useState<IChat[]>([]);
	
	useEffect(()=> {
		setMsgHistories(mockMessageHistories);
	}, [])

	return (
    <Box
      sx={{
        backgroundColor: "#3272D2",
        height: "40vh",
        borderRadius: "5px",
        listStyleType: "none",
        overflowY: "scroll",
        margin: "0% 2% 2% 2%",
      }}
    >
      {msgHistories.map((value, i) => {
        return (
          <ul
            key={i}
            style={{ margin: "1% 0% 1% 0%", padding: "2% 2% 0.5% 2%" }}
          >
            <li className="message_box">{value.name + ": " + value.message}</li>
          </ul>
        );
      })}
    </Box>
  );
};

export default ChatField